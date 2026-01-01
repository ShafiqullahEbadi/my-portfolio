"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { chunkByPattern } from "@/lib/chunk";

interface Reel {
  id?: string;
  title: string;
  reel: string;
  description?: string; // new: optional description
}

interface Props {
  data: Reel[] | null;
}

export function MotionReelSection({ data }: Props) {
  const videos = Array.isArray(data) ? data : data ? [data] : [];
  const rows = chunkByPattern(videos);

  const Card = ({ reel, portrait }: { reel: Reel; portrait: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showDescription, setShowDescription] = useState(false); // new: toggle description
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const togglePlay = () => {
      if (!videoRef.current) return;
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
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

      v.addEventListener("play", onPlay);
      v.addEventListener("pause", onPause);
      v.addEventListener("timeupdate", onTimeUpdate);

      return () => {
        v.removeEventListener("play", onPlay);
        v.removeEventListener("pause", onPause);
        v.removeEventListener("timeupdate", onTimeUpdate);
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
        <div className="absolute top-3 left-3 right-3 z-10 bg-black/50 text-white text-xs px-3 py-1 rounded-lg">
          {reel.title}
        </div>

        <video
          ref={videoRef}
          loop
          muted={muted}
          playsInline
          preload="metadata"
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer"
        >
          <source src={reel.reel} type="video/mp4" />
        </video>

        {/* Control Bar with Play, Mute, and Seek */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-col gap-2 bg-black/50 p-2 rounded-lg">
          <div className="flex justify-between items-center">
            <button onClick={togglePlay} className="p-2 rounded-full text-white">
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button onClick={toggleMute} className="p-2 rounded-full text-white">
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>

          {/* Seek Bar */}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-300 rounded-lg accent-white cursor-pointer"
          />
        </div>

        {/* Description Section */}
        {reel.description && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm p-3 rounded-t-lg max-h-0 overflow-hidden transition-all duration-300"
            style={{ maxHeight: showDescription ? "200px" : "0" }}
          >
            <p>{reel.description}</p>
          </div>
        )}

        {/* Read More Button */}
        {reel.description && (
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="absolute bottom-[calc(100%+10px)] left-3 z-20 bg-black/60 text-white text-xs px-3 py-1 rounded-lg"
          >
            {showDescription ? "Hide" : "Read more"}
          </button>
        )}
      </motion.div>
    );
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Edited Videos & Motion Graphics
      </h2>

      <div className="space-y-10">
        {rows.map((row, rowIndex) => {
          const isPortraitRow = rowIndex % 2 === 0;

          return (
            <div
              key={rowIndex}
              className={`grid gap-6
                ${isPortraitRow ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}
              `}
            >
              {row.map((reel, i) => (
                <Card
                  key={(reel.id || reel.title) + i}
                  reel={reel}
                  portrait={isPortraitRow}
                />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
