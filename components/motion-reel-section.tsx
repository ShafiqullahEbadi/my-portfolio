"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface Reel {
  title: string;
  reel: string; // video URL
}

interface MotionReelSectionProps {
  data: Reel | Reel[] | null;
}

export function MotionReelSection({ data }: MotionReelSectionProps) {
  // Normalize data to always be an array
  const videos: Reel[] = data
    ? Array.isArray(data)
      ? data
      : [data]
    : [];

  if (videos.length === 0) {
    return <p className="text-center py-16">No videos available</p>;
  }

  // Single video card
  const MotionReelCard = ({ reel }: { reel: Reel }) => {
    const ref = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
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
    const videoSrc = reel.reel;

    // Load video
    useEffect(() => {
      if (!videoSrc || !videoRef.current) return;
      setIsLoading(true);
      setHasError(false);
      videoRef.current.load();
    }, [videoSrc]);

    const handleTimeUpdate = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / (video.duration || 1)) * 100);
    }, []);

    // Video events
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
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) video.play().catch(console.error);
      else video.pause();
    };

    const toggleMute = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = !video.muted;
      setIsMuted(video.muted);
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

    // Optional: portrait detection (future enhancement)
    const isPortrait = false; 

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className={`relative ${isPortrait ? "aspect-[9/16]" : "aspect-video"} rounded-3xl overflow-hidden glass-card shadow-2xl bg-black/10`}
      >
        {/* Video */}
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
              ref={videoRef}
              key={videoSrc}
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              onClick={togglePlay}
              onCanPlay={() => setIsLoading(false)}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
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

        {/* Center play button */}
        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center hover:scale-110 transition-transform">
              <Play size={32} className="text-white ml-1" />
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  // Grid layout
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Optional Section Title */}
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

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {videos.map((reel, index) => (
          <MotionReelCard key={index} reel={reel} />
        ))}
      </div>
    </section>
  );
}
