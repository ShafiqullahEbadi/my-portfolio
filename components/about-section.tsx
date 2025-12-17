"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import shafiq from "../public/Shafiqullah Ebadi.jpg.jpg";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stats = [
    { label: "8+ Years Experience", value: "Professional Media Designer" },
    { label: "50+ Projects Completed", value: "Diverse Design & Media Project" },
    {
      label: "PhotoShop • Lightroom • Premiere • After Effects • Illustrator",
      value: "Tech Stack",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left - Image */}
          <motion.div className="relative group" variants={itemVariants}>
            {/* Glowing background effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-500" />

            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl bg-slate-900/50 backdrop-blur-sm">
              <Image
                src={shafiq}
                alt="Shafiqullah Ebadi"
                fill
                objectPosition="center"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div className="space-y-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                Creative visual professional with 8+ years of experience in
                graphic design, motion graphics, video editing, videography, and
                photography. Specialized in visual identity, advertising and
                educational content, animation, and cinematography. Highly
                proficient with advanced computer skills, AI tools, and
                Microsoft Office, with strong communication abilities and proven
                capability to manage complex projects and deliver high-quality
                visual content.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-1 gap-6"
              variants={containerVariants}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all"
                  variants={itemVariants}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                >
                  <p className="font-semibold text-blue-600 dark:text-blue-400">
                    {stat.label}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
