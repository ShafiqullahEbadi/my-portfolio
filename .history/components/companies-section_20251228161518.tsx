"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Company {
  _id: string;
  company_name: string;
  company_logo: string;
}

export function CompaniesSection({ data: companies }: { data: Company[] }) {
  const companiesWithLogos = companies.filter((c) => c.company_logo);

  if (companiesWithLogos.length === 0) return null;

  // Duplicate enough times for seamless scroll
  const marqueeCompanies = [
    ...companiesWithLogos,
    ...companiesWithLogos,
    ...companiesWithLogos,
    ...companiesWithLogos,
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Trusted Companies
        </motion.h1>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400"
        >
          I'm proud to have worked with
        </motion.span>
      </div>

      {/* Marquee wrapper */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex items-center whitespace-nowrap"
          initial={{ x: 0 }}             // Start fully visible
          animate={{ x: "-25%" }}        // Adjust scroll distance
          transition={{
            duration: 40,                // Scroll speed
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {marqueeCompanies.map((company, index) => (
            <div
              key={`${company._id}-${index}`}
              className="mx-4 sm:mx-6 lg:mx-12 flex flex-col items-center justify-center
              transition-all duration-300 opacity-100
              lg:opacity-60 lg:grayscale lg:hover:opacity-100 lg:hover:grayscale-0"
            >
              {/* Logo */}
              <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                <Image
                  src={company.company_logo}
                  alt={company.company_name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Company Name */}
              <p className="mt-2 text-center text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                {company.company_name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
