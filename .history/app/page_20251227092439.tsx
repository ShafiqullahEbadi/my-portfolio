"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import ExperienceSection from "@/components/experience-section";
import Footer from "@/components/footer";
import { ToolsSection } from "@/components/tools-section";
import { ServicesSection } from "@/components/services-section";
import { ProjectsSection } from "@/components/projects-section";
import { MotionReelSection } from "@/components/motion-reel-section";
import { CompaniesSection } from "@/components/companies-section";
import Preloader from "@/components/preloader";

import useGetExperience from "@/hooks/use-get-experience";
import useGetProjects from "@/hooks/use-get-projects";
import useGetCompanies from "@/hooks/use-get-companies";
import useGetReel from "@/hooks/use-get-reel";

export default function Home() {
  const { experiences, loading: expLoading } = useGetExperience();
  const { projects, loading: projLoading } = useGetProjects();
  const { companies, loading: compLoading } = useGetCompanies();
  const { reel, loading: reelLoading } = useGetReel();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!expLoading && !projLoading && !compLoading && !reelLoading) {
      setIsReady(true);
    }
  }, [expLoading, projLoading, compLoading, reelLoading]);

  return (
    <>
      <Preloader isReady={isReady} />
      <main
        className={`bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300 ${
          !isReady ? "h-screen overflow-hidden" : ""
        }`}
      >
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection data={experiences} />
        <ServicesSection />
        <ProjectsSection data={projects} />
        <MotionReelSection data={reel} />
        <ToolsSection />
        <CompaniesSection data={companies} />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
