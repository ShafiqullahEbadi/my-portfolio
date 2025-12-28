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
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const handleTimeUpdate = useCallback(() => {
      if (!videoRef.current) return;
      setCurrentTime(videoRef.current.currentTime);
      setProgress(
        (videoRef.current.currentTime / (videoRef.current.duration || 1)) * 100
      );
    }, []);

    useEffect(() => {
      const video = videoRef.current;
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
      if (!videoRef.current) return;
      if (videoRef.current.paused)
        videoRef.current.play().catch(console.error);
      else videoRef.current.pause();
    };

    const toggleMute = () => {
      if (!videoRef.current) return;
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || !videoRef.current) return;
      const rect = progressRef.current.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      videoRef.current.currentTime = pos * videoRef.current.duration;
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
        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-black flex items-center justify-center h-[400px] sm:h-[500px] lg:h-[600px]">
          <video
            ref={videoRef}
            loop
            playsInline
            preload="metadata"
            className="max-h-full max-w-full object-contain cursor-pointer"
            onClick={togglePlay}
            onCanPlay={() => setIsLoading(false)}
          >
            <source src={reel.reel} type="video/mp4" />
          </video>

          {/* Overlay Controls */}
          <div className="absolute bottom-4 left-0 right-0 bg-black/50 p-2 flex flex-col space-y-2">
            {/* Progress Bar */}
            <div
              ref={progressRef}
              className="h-2 w-full bg-gray-600/50 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Buttons and Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={togglePlay}
                  className="p-1 sm:p-2 rounded-full hover:bg-white/20"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1 sm:p-2 rounded-full hover:bg-white/20"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
              <span className="text-xs sm:text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* Title below video container */}
        <div className="mt-2 p-2 bg-gray-900 text-white text-sm sm:text-base rounded-b-2xl ">
          {reel.title}
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
        <h2 className="text-4xl md:text-5xl font-bold">
          Edited Videos & Motion Graphics
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {videos.map((reel, index) => (
          <MotionReelCard key={(reel.id || reel.title) + index} reel={reel} />
        ))}
      </div>
    </section>
  );
}
