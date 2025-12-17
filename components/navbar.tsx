"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${
        isScrolled ? "pt-4" : "pt-0"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`transition-all duration-300 flex justify-between items-center px-4 sm:px-6 lg:px-8 ${
          isScrolled
            ? "w-[90%] md:w-[70%] lg:w-[60%] bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-full shadow-lg border border-white/20 dark:border-white/10 py-3"
            : "w-full max-w-6xl py-6 bg-transparent"
        }`}
      >
        <motion.div
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Shafiqullah Ebadi
        </motion.div>

        <div className="flex gap-1 items-center">
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <motion.div
                  className="px-3 py-1.5 rounded-full cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-white/5 transition-all relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2 hidden md:block" />

          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <motion.button
            className="ml-2 px-4 py-1.5 rounded-full bg-blue-600 dark:bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="shafiqCV.pdf" download>
              CV
            </a>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
