"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Video, Sparkles, Palette, Share2, Film } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Brand identity, logos, and visual communication that makes an impact.",
  },
  {
    icon: Video,
    title: "Video Editing",
    description:
      "Cinematic storytelling through professional post-production and editing.",
  },
  {
    icon: Sparkles,
    title: "Motion Design",
    description:
      "Engaging animations and motion graphics that bring content to life.",
  },
  {
    icon: Layers,
    title: "Branding",
    description: "Complete brand systems that create memorable experiences.",
  },
  {
    icon: Share2,
    title: "Social Media Content",
    description: "Scroll-stopping content optimized for digital platforms.",
  },
  {
    icon: Film,
    title: "Commercial Ads",
    description: "High-impact advertising that drives results and engagement.",
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-500/5 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">
            Services
          </span>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            What I Do
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white/80 dark:bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 shadow-sm"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300"
              >
                <service.icon className="w-7 h-7 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
