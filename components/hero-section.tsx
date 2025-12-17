"use client";

import { motion, type Variants } from "framer-motion";
import MagneticButton from "./magnetic-button";
import Cube3D from "./3d-cube";
import FloatingBlobs from "./floating-blobs";
import CursorFollower from "./cursor-follower";
import MobileHeroBackground from "./mobile-hero-background";

export default function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background">
      <FloatingBlobs />
      <CursorFollower />
      <MobileHeroBackground />

      {/* Spotlight Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Text */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main headline with parallax */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.div
              className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              👋 Welcome to my portfolio
            </motion.div>
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight"
              variants={itemVariants}
            >
              Multimedia Designer
            </motion.h1>
            <motion.div
              className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full"
              variants={itemVariants}
            />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl text-justify"
            variants={itemVariants}
          >
            I create impactful visual content through graphic design, motion
            graphics, and video editing, specializing in visual identity,
            advertising, and educational media using professional Adobe tools.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="flex gap-4 pt-4" variants={itemVariants}>
            <MagneticButton
              variant="primary"
              onClick={() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </MagneticButton>
            <MagneticButton variant="secondary">
              <a href="/shafiqCV.pdf" download>
                Download CV
              </a>
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-8 pt-8 border-t border-gray-200 dark:border-gray-800"
            variants={itemVariants}
          >
            {[
              { label: "Projects", value: "50+" },
              { label: "Experience", value: "8+" },
              { label: "Softwares", value: "15+" },
            ].map((stat, i) => (
              <motion.div key={i} whileHover={{ y: -5 }}>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - 3D Cube */}
        <motion.div
          className="relative h-96 hidden lg:flex items-center justify-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <Cube3D />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Scroll to explore
        </p>
        <svg
          className="w-6 h-6 text-gray-600 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
