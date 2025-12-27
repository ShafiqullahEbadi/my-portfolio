"use client";

import type React from "react";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import MagneticButton from "./magnetic-button";

import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MessageCircle,
  Link2,
} from "lucide-react";

import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formRef.current) return;

    try {
      // REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
      // Service ID, Template ID, Public Key
      await emailjs.sendForm(
        "service_aph0vn3",
        "template_ct2g2re",
        formRef.current,
        "aMXlivvNin6lANus5"
      );

      setSubmitStatus({ success: true, message: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: "www.linkedin.com/in/shafiqullah-ebadi-a42900296",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:shafiq.ebadii@gmail.com",
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      href: "https://wa.me/93770668357",
    },
    {
      name: "Linktree",
      icon: <Link2 className="w-5 h-5" />,
      href: "https://linktr.ee/shafiqullah.ebadi",
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have a project in mind? Feel free to reach out and let's create
              something amazing together.
            </p>
          </div>

          <motion.div
            className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-8 md:p-12 shadow-lg"
            whileHover={{ boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.input
                  type="text"
                  name="user_name" // EmailJS needs name attribute
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none transition-colors"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.input
                  type="email"
                  name="user_email" // EmailJS needs name attribute
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none transition-colors"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <motion.textarea
                name="message" // EmailJS needs name attribute
                placeholder="Your Message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none transition-colors resize-none"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                whileFocus={{ scale: 1.02 }}
              />

              <div className="flex justify-center pt-4">
                <MagneticButton variant="primary" onClick={() => {}}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </MagneticButton>
              </div>
              {submitStatus && (
                <div
                  className={`text-center mt-4 ${
                    submitStatus.success ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>

            {/* Social Links */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                Or connect with me on social media
              </p>
              <div className="flex justify-center gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 dark:from-blue-900 to-purple-100 dark:to-purple-900 flex items-center justify-center text-xl hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                    title={link.name}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
