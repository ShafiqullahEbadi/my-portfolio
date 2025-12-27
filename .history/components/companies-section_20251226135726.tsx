"use client";

import { motion } from "framer-motion";
import useGetExperience from "@/hooks/use-get-experience";
import useGetProjects from "@/hooks/use-get-projects";

export function CompaniesSection() {
  const { experiences, loading: expLoading } = useGetExperience();
  const { projects, loading: projLoading } = useGetProjects();

  if (expLoading || projLoading) return null;

  // Extract unique companies from both experiences and projects
  const expCompanies = experiences.map((exp) => exp.company);
  const projCompanies = projects
    .map((proj) => proj.company)
    .filter(Boolean) as string[];

  const allCompanies = Array.from(new Set([...expCompanies, ...projCompanies]));

  if (allCompanies.length === 0) return null;

  // Duplicate the list for seamless marquee
  const marqueeCompanies = [...allCompanies, ...allCompanies, ...allCompanies];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400"
        >
          Trusted By
        </motion.span>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {marqueeCompanies.map((company, index) => (
            <div
              key={`${company}-${index}`}
              className="mx-12 flex items-center justify-center"
            >
              <span className="text-2xl md:text-4xl font-bold text-slate-400 dark:text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default select-none">
                {company}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
