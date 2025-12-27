"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import useGetExperience from "@/hooks/use-get-experience";
import useGetProjects from "@/hooks/use-get-projects";
import useGetCompanies from "@/hooks/use-get-companies";

export function CompaniesSection() {
  const { experiences, loading: expLoading } = useGetExperience();
  const { projects, loading: projLoading } = useGetProjects();
  const { companies: apiCompanies, loading: compLoading } = useGetCompanies();

  if (expLoading || projLoading || compLoading) return null;

  // Extract unique companies from both experiences and projects as fallback
  const expCompanies = experiences.map((exp) => exp.company);
  const projCompanies = projects
    .map((proj) => proj.company)
    .filter(Boolean) as string[];

  const derivedCompanies = Array.from(
    new Set([...expCompanies, ...projCompanies])
  );

  // Use API companies if available, otherwise use derived ones
  const displayCompanies =
    apiCompanies.length > 0
      ? apiCompanies.map((c) => ({
          name: c.company_name,
          logo: c.company_logo,
        }))
      : derivedCompanies.map((name) => ({ name, logo: null }));

  if (displayCompanies.length === 0) return null;

  // Duplicate the list for seamless marquee
  const marqueeCompanies = [
    ...displayCompanies,
    ...displayCompanies,
    ...displayCompanies,
  ];

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
          className="flex whitespace-nowrap items-center"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {marqueeCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="mx-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              {company.logo ? (
                <div className="relative h-12 w-32">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <span className="text-2xl md:text-3xl font-bold text-slate-400 dark:text-slate-600 cursor-default select-none">
                  {company.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
