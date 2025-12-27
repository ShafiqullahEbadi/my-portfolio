"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUp,
  MessageCircle,
  Instagram,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/sajjad-matin",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:shafiq.ebadii@gmail.com", label: "Email" },
    {
      icon: MessageCircle,
      href: "https://wa.me/93770668357",
      label: "WhatsApp",
    },
  ];

  const footerLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gray-50 dark:bg-slate-900/50 pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,white,transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Shafiqullah Ebadi
            </motion.div>
            <motion.p
              className="text-gray-600 dark:text-gray-400 max-w-xs text-justify"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Creating engaging visual and digital experiences through graphic
              design, motion graphics, and video production using modern
              creative technologies.
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-slate-700"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h3
              className="font-semibold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600/0 group-hover:bg-blue-600 transition-colors" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h3
              className="font-semibold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Contact
            </motion.h3>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-600 dark:text-gray-400">
                Feel free to reach out for collaborations or just a friendly
                hello.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:contact@sajjadmatin.com"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  shafiq.ebadii@gmail.com
                </a>
                <p className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  +93770668357
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Created by with social icons */}
          <motion.div
            className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {/* Social Icons */}
            <span>Created by Sajjad Matin</span>
            <a
              href="www.linkedin.com/in/sajjad-matin-mahmodi-4308602b5"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-full hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://www.instagram.com/sajjadmatinmahmodi/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-full hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://wa.me/93744217212"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-full hover:text-green-500 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href="https://linktr.ee/shafiqullah.ebadi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-full hover:text-green-500 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-sm text-gray-500 dark:text-gray-500 text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            © {currentYear} Shafiqullah Ebadi. All rights reserved.
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-slate-700 group"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp
              size={20}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
