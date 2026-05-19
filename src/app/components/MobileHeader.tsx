import { NavLink } from "react-router";
import { motion } from "motion/react";

export function MobileHeader() {
  return (
    <div className="fixed top-0 left-0 w-full h-[80px] flex items-center justify-between px-[20px] z-[100] pointer-events-none md:hidden pt-[20px]">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-['Albert_Sans'] font-medium text-[11px] tracking-[1px] uppercase pointer-events-auto relative pb-[4px] ${
            isActive ? "text-white" : "text-white/70 hover:text-white"
          }`
        }
      >
        {({ isActive }) => (
          <>
            About
            <motion.div
              className="absolute bottom-0 left-0 h-[1.5px] bg-white"
              initial={false}
              animate={{ width: isActive ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: [0.86, 0, 0.07, 1] }}
            />
          </>
        )}
      </NavLink>

      <NavLink
        to="/portfolio"
        className={({ isActive }) =>
          `font-['Albert_Sans'] font-medium text-[11px] tracking-[1px] uppercase pointer-events-auto relative pb-[4px] ${
            isActive ? "text-white" : "text-white/70 hover:text-white"
          }`
        }
      >
        {({ isActive }) => (
          <>
            Portfolio
            <motion.div
              className="absolute bottom-0 left-0 h-[1.5px] bg-white"
              initial={false}
              animate={{ width: isActive ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: [0.86, 0, 0.07, 1] }}
            />
          </>
        )}
      </NavLink>
    </div>
  );
}