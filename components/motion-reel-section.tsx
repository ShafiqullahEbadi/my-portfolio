"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface Reel {
  id?: string;
  title: string;
  reel: string;
  thumbnail: string; // ✅ ADDED
  description?: string;
  orientation?: "portrait" | "landscape";
}

interface Props {
  data: Reel[] | null;
}

// Helper function to detect video orientation
async function getVideoOrientation(
  videoUrl: string
): Promise<"portrait" | "landscape"> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      const aspectRatio = video.videoWidth / video.videoHeight;
      resolve(aspectRatio < 1 ? "portrait" : "landscape");
    };

    video.onerror = () => resolve("landscape");
    video.src = videoUrl;
  });
}

export function MotionReelSection({ data }: Props) {
  const videos = Array.isArray(data) ? data : data ? [data] : [];
  const [portraitVideos, setPortraitVideos] = useState<Reel[]>([]);
  const [landscapeVideos, setLandscapeVideos] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categorizeVideos = async () => {
      setLoading(true);
      const portraits: Reel[] = [];
      const landscapes: Reel[] = [];

      for (const video of videos) {
        const orientation = await getVideoOrientation(video.reel);
        if (orientation === "portrait") portraits.push(video);
        else landscapes.push(video);
      }

      setPortraitVideos(portraits);
      setLandscapeVideos(landscapes);
      setLoading(false);
    };

    if (videos.length > 0) categorizeVideos();
    else setLoading(false);
  }, [videos]);

  const Card = ({ reel, portrait }: { reel: Reel; portrait: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [started, setStarted] = useState(false); // ✅ NEW
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showDescription, setShowDescription] = useState(false);

    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const togglePlay = () => {
      if (!videoRef.current) return;
      videoRef.current.paused
        ? videoRef.current.play()
        : videoRef.current.pause();
    };

    const toggleMute = () => {
      if (!videoRef.current) return;
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    };

    const handleProgress = () => {
      if (!videoRef.current) return;
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress(current / duration);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!videoRef.current) return;
      const value = parseFloat(e.target.value);
      videoRef.current.currentTime = value * videoRef.current.duration;
      setProgress(value);
    };

    useEffect(() => {
      const v = videoRef.current;
      if (!v) return;

      const onPlay = () => setPlaying(true);
      const onPause = () => setPlaying(false);
      const onTimeUpdate = () => handleProgress();
      const onEnded = () => {
        setPlaying(false);
        setStarted(false); // 🔁 back to thumbnail
        setProgress(0);
      };

      v.addEventListener("play", onPlay);
      v.addEventListener("pause", onPause);
      v.addEventListener("timeupdate", onTimeUpdate);
      v.addEventListener("ended", onEnded);

      return () => {
        v.removeEventListener("play", onPlay);
        v.removeEventListener("pause", onPause);
        v.removeEventListener("timeupdate", onTimeUpdate);
        v.removeEventListener("ended", onEnded);
      };
    }, []);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={`relative rounded-2xl overflow-hidden bg-black shadow-lg
          ${portrait ? "aspect-[9/16]" : "aspect-video"}
        `}
      >
        {/* TITLE */}
        <div className="absolute top-3 left-3 right-3 z-20 bg-black/50 text-white text-xs px-3 py-1 rounded-lg">
          {reel.title}
        </div>

        {/* THUMBNAIL (before play) */}
        {!started && (
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={() => {
              setStarted(true);
              setTimeout(() => videoRef.current?.play(), 50);
            }}
          >
            <img
              src={reel.thumbnail}
              alt={reel.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="text-black" />
              </div>
            </div>
          </div>
        )}

        {/* VIDEO */}
        <video
          ref={videoRef}
          loop={false}
          muted={muted}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onClick={togglePlay}
        >
          <source src={reel.reel} type="video/mp4" />
        </video>

        {/* CONTROLS (only after started) */}
        {started && (
          <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col gap-2 bg-black/50 p-2 rounded-lg">
            <div className="flex justify-between items-center">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full text-white hover:bg-white/20"
              >
                {playing ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-full text-white hover:bg-white/20"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-300 rounded-lg accent-white"
            />
          </div>
        )}

        {/* DESCRIPTION */}
        {reel.description && (
          <div
            className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm p-3 rounded-t-lg overflow-hidden transition-all duration-300"
            style={{ maxHeight: showDescription ? "200px" : "0" }}
          >
            <p>{reel.description}</p>
          </div>
        )}

        {reel.description && (
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="absolute bottom-[calc(100%+10px)] left-3 z-30 bg-black/60 text-white text-xs px-3 py-1 rounded-lg"
          >
            {showDescription ? "Hide" : "Read more"}
          </button>
        )}
      </motion.div>
    );
  };

  if (loading) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Edited Videos & Motion Graphics
        </h2>
        <div className="text-center text-gray-500">Loading videos...</div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Edited Videos & Motion Graphics
      </h2>

      <div className="space-y-16">
        {portraitVideos.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Portrait Videos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {portraitVideos.map((reel, i) => (
                <Card key={(reel.id || reel.title) + i} reel={reel} portrait />
              ))}
            </div>
          </div>
        )}

        {landscapeVideos.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Landscape Videos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {landscapeVideos.map((reel, i) => (
                <Card
                  key={(reel.id || reel.title) + i}
                  reel={reel}
                  portrait={false}
                />
              ))}
            </div>
          </div>
        )}

        {portraitVideos.length === 0 && landscapeVideos.length === 0 && (
          <div className="text-center text-gray-500">No videos available</div>
        )}
      </div>
    </section>
  );
}
