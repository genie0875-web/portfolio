import { Outlet, NavLink, useLocation } from "react-router";
import { motion } from "motion/react";
import { MobileHeader } from "./MobileHeader";

export default function Root() {
  const location = useLocation();

  return (
    <div className="w-screen min-h-screen bg-[#131313] text-white font-['Albert_Sans'] selection:bg-[#ff4600] selection:text-white">
      <header className="hidden md:flex fixed top-[30px] left-[30px] right-[30px] justify-between items-center z-[100] pointer-events-none">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-item font-['Albert_Sans'] font-medium text-[14px] tracking-[1.4px] uppercase pointer-events-auto relative pb-1.5 cursor-hover ${
              isActive ? "text-white" : "text-white/70 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              ABOUT
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-white"
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
            `nav-item font-['Albert_Sans'] font-medium text-[14px] tracking-[1.4px] uppercase pointer-events-auto relative pb-1.5 cursor-hover ${
              isActive ? "text-white" : "text-white/70 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              PORTFOLIO
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-white"
                initial={false}
                animate={{ width: isActive ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: [0.86, 0, 0.07, 1] }}
              />
            </>
          )}
        </NavLink>
      </header>

      <MobileHeader />

      <div className="fixed bottom-[30px] left-[30px] font-['Albert_Sans'] font-medium text-[14px] tracking-[1.4px] uppercase text-white z-[100] pointer-events-none hidden md:block">
        ©2026
      </div>

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
