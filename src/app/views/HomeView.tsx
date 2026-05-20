import { useState, useEffect, useRef } from "react";
import { HeroSection } from "./Home/HeroSection";
import { CareerSection } from "./Home/CareerSection";
import { SelectedWorkSection } from "./Home/SelectedWorkSection";
import { ContactSection } from "./Home/ContactSection";
import { VerticalNav } from "../components/VerticalNav";

export function HomeView() {
  const [activeSection, setActiveSection] = useState("section-01");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }  // 0.5 → 0.3으로 낮춰서 더 잘 감지
    );

    const sections = document.querySelectorAll(".home-section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#131313] scroll-smooth relative"
    >
      <VerticalNav activeSection={activeSection} />
      
      <section id="section-01" className="home-section snap-start w-full h-[100dvh] relative flex flex-col justify-center px-0 md:px-[150px] md:-mt-[100px]">
        <HeroSection isActive={activeSection === "section-01"} />
      </section>

      <section id="section-02" className="home-section snap-start w-full h-[100dvh] relative flex flex-col justify-center px-0 md:px-[150px] md:-mt-[100px]">
        <CareerSection isActive={activeSection === "section-02"} />
      </section>

      <section id="section-03" className="home-section snap-start w-full h-[100dvh] relative flex flex-col justify-center px-0 md:px-[150px] md:-mt-[100px]">
        <SelectedWorkSection isActive={activeSection === "section-03"} />
      </section>

      {/* ✅ Contact: snap-start + min-h-[100dvh] */}
      <section id="section-04" className="home-section snap-start w-full min-h-[100dvh] relative flex flex-col justify-center px-0 md:px-[150px]">
        <ContactSection isActive={activeSection === "section-04"} />
      </section>
    </div>
  );
}
