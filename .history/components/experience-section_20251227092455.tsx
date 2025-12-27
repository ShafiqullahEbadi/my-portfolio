"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";
interface Experience {
  _id?: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
}

export default function ExperienceSection({
  data: experiences,
}: {
  data: Experience[];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="experience"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[400px]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
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
                            {exp.title}
                          </h3>

                          <div className="flex items-center md:justify-end gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
                            <Calendar size={14} />
                            <span>
                              {exp.startDate} - {exp.endDate}
                            </span>
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-justify">
                            {exp.description}
                          </p>

                          <div className="flex flex-wrap md:justify-end gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-full font-medium"
                              >
                                {tech}
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
                            {exp.title}
                          </h3>

                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
                            <Calendar size={14} />
                            <span>
                              {exp.startDate} - {exp.endDate}
                            </span>
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-justify">
                            {exp.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-full font-medium"
                              >
                                {tech}
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
                            {exp.title}
                          </h3>

                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
                            <Calendar size={14} />
                            <span>
                              {exp.startDate} - {exp.endDate}
                            </span>
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-justify">
                            {exp.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-full font-medium"
                              >
                                {tech}
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
        )}
      </div>
    </section>
  );
}
