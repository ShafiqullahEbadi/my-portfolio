"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

interface Company {
  _id: string;
  company_name: string;
  company_logo: string;
}

export function CompaniesSection({ data: companies }: { data: Company[] }) {
  const companiesWithLogos = companies.filter((c) => c.company_logo);

  if (companiesWithLogos.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Trusted Companies
        </h1>
        <span className="text-sm font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400">
          I'm proud to have worked with
        </span>
      </div>

      {/* Marquee */}
      <Marquee gradient={false} speed={40} pauseOnHover={true} play={true}>
        {companiesWithLogos.map((company) => (
          <div
            key={company._id}
            className="flex flex-col items-center justify-center px-4 sm:px-6"
          >
            <div className="relative h-28 w-28 sm:h-32 sm:w-32">
              <Image
                src={company.company_logo}
                alt={company.company_name}
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-2 text-center text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              {company.company_name}
            </p>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
