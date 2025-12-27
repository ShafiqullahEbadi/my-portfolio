"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";
import useGetExperience from "@/hooks/use-get-experience";

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  useGetExperience()

  // const experiences = [
  //   {
  //     company: "Lapis Group.",
  //     role: "Media Designer",
  //     period: "2025 - Present",
  //     description:
  //       "Edited educational videos for the SENF program aimed at producing school subject lessons for students, especially girls with limited access to formal education. Designed and created motion graphics, including animated explanations, visual elements, typographic animations, and instructional graphics to enhance learning. Collaborated closely with the production team, subject teachers, and content specialists to ensure alignment with UNICEF’s educational standards. Performed color correction, lighting adjustments, audio mixing, and final mastering to prepare high-quality outputs for TV and digital platforms. Managed project timelines, delivered videos within strict deadlines, and maintained consistent quality across all episodes. Utilized Adobe Premiere Pro, After Effects, Illustrator, and Audition for the full workflow of editing and motion design.",
  //     tags: [
  //       "After Effects",
  //       "Premiere Pro",
  //       "DaVinci Resolve",
  //       "Audition",
  //       "Blender",
  //       "Photoshop",
  //       "Illustrator",
  //       "Lightroom",
  //     ],
  //   },
  //   {
  //     company: "HOSP Organization",
  //     role: "Videographer, Video Editor & Motion Designer",
  //     period: "05/03/2025 - 16/09/2025",
  //     description: 'Filming institutional activities and events, Recording workshops, meetings, interviews, and eld programs. Video editing, Editing and assembling visual materials, including scene selection, sound adjustment, color correction, and adding graphic e ects. Professional photography – Capturing high-quality photos of eld activities, projects and activities.',
  //     tags: [
  //       "After Effects",
  //       "Premiere Pro",
  //       "DaVinci Resolve",
  //       "Audition",
  //       "Blender",
  //       "Photoshop",
  //       "Illustrator",
  //       "Lightroom",
  //     ],
  //   },
  //   {
  //     company: "NSDO Organization",
  //     role: "Graphic & Motion Design Trainer",
  //     period: "12/07/2024 - 01/02/2025",
  //     description:
  //       "Designing the curriculum structure – Planning and organizing content for the Graphic and Motion Design course. Preparing educational content – Creating examples, sample projects, and practice les for future students. Developing instructional guides – Writing instructions and explanations for each section of the curriculum..",
  //     tags: [
  //       "After Effects",
  //       "Premiere Pro",
  //       "DaVinci Resolve",
  //       "Audition",
  //       "Blender",
  //       "Photoshop",
  //       "Illustrator",
  //       "Lightroom",
  //     ],
  //   },{
  //     company: "Morph Studio",
  //     role: "Videographer, Photographer, Video Editor & Motion Designer",
  //     period: "25/09/2023 - 20/03/2024",
  //     description:
  //       "Produced professional video and photo content for promotional, commercial, and social media projects. Filmed, photographed, and edited visual content with strong storytelling, color grading, and sound design. Created motion graphics, logo animations, and visual elements using Adobe Premiere Pro, After Effects, Photoshop, and Illustrator. Collaborated with clients to develop concepts and deliver high-quality content aligned with brand goals. Managed the full production pipeline from planning and shooting to post-production and final delivery..",
  //     tags: [
  //       "After Effects",
  //       "Premiere Pro",
  //       "DaVinci Resolve",
  //       "Audition",
  //       "Blender",
  //       "Photoshop",
  //       "Illustrator",
  //       "Lightroom",
  //     ],
  //   },
  // ];

  return (
    <section
      id="experience"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Work Experience
          </h2>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 opacity-30" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col md:flex-row items-center justify-between"
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Left Side */}
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0 mb-8 md:mb-0 ${
                      index % 2 !== 0 ? "order-1" : "order-1 md:order-3"
                    }`}
                  >
                    {index % 2 !== 0 && (
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow group text-left md:text-right">
                        <div className="flex items-center md:justify-end gap-2 text-blue-600 dark:text-blue-400 mb-2">
                          <span className="font-semibold hidden md:inline">
                            {exp.company}
                          </span>
                          <Briefcase size={16} />
                          <span className="font-semibold md:hidden">
                            {exp.company}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                          {exp.role}
                        </h3>

                        <div className="flex items-center md:justify-end gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
                          <span className="hidden md:inline">{exp.period}</span>
                          <Calendar size={14} />
                          <span className="md:hidden">{exp.period}</span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-justify">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap md:justify-end gap-2">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Mobile View for Even Items (since they are empty on desktop left side) */}
                    {index % 2 === 0 && (
                      <div className="md:hidden bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow group text-left">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                          <Briefcase size={16} />
                          <span className="font-semibold">{exp.company}</span>
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                          {exp.role}
                        </h3>

                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
                          <Calendar size={14} />
                          <span>{exp.period}</span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-justify">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 border-4 border-white dark:border-slate-950 z-10" />

                  {/* Right Side */}
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0 ${
                      index % 2 === 0 ? "order-1 md:order-3" : "order-1"
                    }`}
                  >
                    {index % 2 === 0 && (
                      <div className="hidden md:block bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow group text-left">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                          <Briefcase size={16} />
                          <span className="font-semibold">{exp.company}</span>
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                          {exp.role}
                        </h3>

                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
                          <Calendar size={14} />
                          <span>{exp.period}</span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-justify">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
