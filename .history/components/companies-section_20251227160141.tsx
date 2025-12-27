"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Company {
  _id: string;
  company_name: string;
  company_logo: string;
}

export function CompaniesSection({ data: companies }: { data: Company[] }) {
  // Filter companies that have a logo
  const companiesWithLogos = companies.filter((c) => c.company_logo);

  if (companiesWithLogos.length === 0) return null;

  // Duplicate the list for seamless marquee
  const marqueeCompanies = [
    ...companiesWithLogos,
    ...companiesWithLogos,
    ...companiesWithLogos,
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        {/* Main Section Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Trusted Companies
        </motion.h1>

        {/* Subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400"
        >
          I'm proud to have worked with
        </motion.span>
      </div>

      {/* Marquee */}
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
              key={`${company._id}-${index}`}
              className="mx-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <div className="relative flex flex-col items-center justify-center h-16 w-40 sm:h-30 sm:w-65">
                <Image
                  src={company.company_logo}
                  alt={company.company_name}
                  fill
                  className="object-contain"
                />
                <p>{company.company_name}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
