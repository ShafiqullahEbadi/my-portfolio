"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tools = [
  { name: "After Effects", category: "Motion" },
  { name: "Premiere Pro", category: "Video" },
  { name: "DaVinci Resolve", category: "Video" },
  { name: "Audition", category: "Audio" },
  { name: "Blender", category: "3D" },
  { name: "Photoshop", category: "Design" },
  { name: "Illustrator", category: "Design" },
  { name: "Adobe XD", category: "UI/UX" },
];

export function ToolsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-500/5 to-background" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">
            Tools & Skills
          </span>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            My Toolkit
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-md p-6 rounded-xl text-center border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-colors shadow-sm"
            >
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-2">
                {tool.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {tool.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
