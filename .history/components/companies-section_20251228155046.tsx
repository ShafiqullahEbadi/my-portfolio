<motion.div
  className="flex items-center whitespace-nowrap"
  initial={{ x: 0 }}         // Start at 0 so no empty space
  animate={{ x: "-33.33%" }} // Move left
  transition={{
    duration: 100,           // Adjust speed here
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
</motion.div>
