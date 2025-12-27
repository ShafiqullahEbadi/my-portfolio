"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface Reel {
  id?: string;
  title: string;
  reel: string; // video URL
}

interface MotionReelSectionProps {
  data: Reel[] | null;
}

export function MotionReelSection({ data }: MotionReelSectionProps) {
  const videos: Reel[] = Array.isArray(data) ? data : data ? [data] : [];

  if (videos.length === 0) {
    return <p className="text-center py-16">No videos available</p>;
  }

  const MotionReelCard = ({ reel }: { reel: Reel }) => {
    const ref = useRef(null);
    const desktopVideoRef = useRef<HTMLVideoElement>(null);
    const mobileVideoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const handleTimeUpdate = useCallback(() => {
      const video = desktopVideoRef.current || mobileVideoRef.current;
      if (!video) return;
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / (video.duration || 1)) * 100);
    }, []);

    useEffect(() => {
      const video = desktopVideoRef.current || mobileVideoRef.current;
      if (!video) return;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleLoadedMetadata = () => setDuration(video.duration);
      const handleError = () => setHasError(true);

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("error", handleError);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("error", handleError);
      };
    }, [handleTimeUpdate]);

    const togglePlay = () => {
      const video = desktopVideoRef.current || mobileVideoRef.current;
      if (!video) return;
      if (video.paused) video.play().catch(console.error);
      else video.pause();
    };

    const toggleMute = () => {
      const video = desktopVideoRef.current || mobileVideoRef.current;
      if (!video) return;
      video.muted = !video.muted;
      setIsMuted(video.muted);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const video = desktopVideoRef.current || mobileVideoRef.current;
      if (!progressRef.current || !video) return;
      const rect = progressRef.current.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      video.currentTime = pos * video.duration;
    };

    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col"
      >
        {/* Desktop */}
        <div className="relative rounded-3xl overflow-hidden glass-card shadow-2xl bg-black/10 aspect-video hidden sm:block">
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-red-100 text-red-600">
                Failed to load video
              </div>
            ) : (
              <video
                ref={desktopVideoRef}
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
                onCanPlay={() => setIsLoading(false)}
              >
                <source src={reel.reel} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls || !isPlaying ? "opacity-100" : "opacity-0"
            }`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <div
              ref={progressRef}
              className="h-2 bg-gray-600/50 rounded-full mb-2 cursor-pointer relative"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20 p-2 rounded-full"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20 p-2 rounded-full"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <span className="text-sm text-white/80 font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="block sm:hidden rounded-2xl overflow-hidden shadow-lg bg-gray-100 mt-4">
          <div className="relative w-full h-64">
            <video
              ref={mobileVideoRef}
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              onClick={togglePlay}
              onCanPlay={() => setIsLoading(false)}
            >
              <source src={reel.reel} type="video/mp4" />
            </video>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-1">{reel.title}</h3>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 text-center"
      >
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-2 block">
          Showreels
        </span>
        <h2 className="text-4xl md:text-5xl font-bold">Video Gallery</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {videos.map((reel, index) => (
          <MotionReelCard key={(reel.id || reel.title) + index} reel={reel} />
        ))}
      </div>
    </section>
  );
}
