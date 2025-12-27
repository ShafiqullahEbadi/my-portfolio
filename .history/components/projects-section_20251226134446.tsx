"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import useGetProjects from "@/hooks/use-get-projects";


// const projects = [
  //   {
    //     id: 1,
    //     title: "Brand Identity",
    //     category: "Graphic Design",
    //     image: "/modern-brand-identity.png",
    //     description: "Complete brand system for a tech startup",
    //   },
    //   {
      //     id: 2,
      //     title: "Motion Reel",
      //     category: "Motion Design",
      //     image: "/motion-graphics-abstract-shapes.jpg",
      //     description: "Animated brand elements and transitions",
      //   },
      //   {
        //     id: 3,
        //     title: "Commercial Ad",
        //     category: "Video Editing",
        //     image: "/cinematic-commercial-video-production.jpg",
        //     description: "30-second product commercial",
        //   },
        //   {
          //     id: 4,
          //     title: "Social Campaign",
          //     category: "Graphic Design",
          //     image: "/social-media-campaign.png",
          //     description: "Multi-platform social media content",
          //   },
          //   {
//     id: 5,
//     title: "Title Sequence",
//     category: "Motion Design",
//     image: "/cinematic-title-sequence-design.jpg",
//     description: "Animated title sequence for documentary",
//   },
//   {
  //     id: 6,
  //     title: "Music Video",
  //     category: "Video Editing",
  //     image: "/music-video-editing-creative.jpg",
  //     description: "Artistic music video production",
  //   },
  // ];
  
  export function ProjectsSection() {
    useGetProjects()
    const categories = ["All", "Graphic Design", "Motion Design", "Video Editing"];
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [activeCategory, setActiveCategory] = useState("All");
    
    const filteredProjects =
    activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);
    
    return (
      <section
      ref={ref}
      id="work"
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-500/5 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Selected Work
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-blue-600 hover:bg-blue-700 text-white border-transparent"
                    : "border-blue-200 dark:border-blue-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-600 dark:text-gray-300"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-medium text-blue-400 uppercase tracking-wider mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
