import { motion } from "motion/react";

const dots = [
  { id: "section-01", num: "01", label: "Hello" },
  { id: "section-02", num: "02", label: "Career" },
  { id: "section-03", num: "03", label: "Portfolio" },
  { id: "section-04", num: "04", label: "Contact" },
];

export function VerticalNav({ activeSection }: { activeSection: string }) {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-50 pointer-events-auto items-end max-md:hidden">
      {dots.map((dot) => {
        const isActive = activeSection === dot.id;
        return (
          <div
            key={dot.id}
            onClick={() => handleScroll(dot.id)}
            className="flex flex-col items-end relative py-1 cursor-hover cursor-pointer group"
          >
            <motion.span
              animate={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)" }}
              className="text-xs font-bold font-['Albert_Sans'] transition-colors duration-300"
            >
              {dot.num}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{
                opacity: isActive ? 1 : 0,
                height: isActive ? "auto" : 0,
                marginTop: isActive ? 4 : 0,
              }}
              className="text-[11px] font-bold text-white whitespace-nowrap overflow-hidden font-['Albert_Sans']"
            >
              {dot.label}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}
