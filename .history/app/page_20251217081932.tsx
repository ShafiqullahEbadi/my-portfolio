import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import ExperienceSection from "@/components/experience-section"
import Footer from "@/components/footer"
import { ToolsSection } from "@/components/tools-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { MotionReelSection } from "@/components/motion-reel-section"

export default function Home() {
  return (
    <main className="bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ServicesSection />
      <ProjectsSection />
      <MotionReelSection />
      <ToolsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
