import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { usePortfolios } from "../../../hooks/usePortfolios";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// 데스크탑 이미지 위치/크기 고정값 (레이아웃 유지)
const desktopStyles = [
  { width: 272, height: 378, left: 442, top: 140, zIndex: 5,  borderRadius: 20, delay: 0.2 },
  { width: 272, height: 280, left: 744, top: 400, zIndex: 5,  borderRadius: 30, delay: 0.3 },
  { width: 180, height: 110, left: 0,   top: 640, zIndex: 25, borderRadius: 15, delay: 0.4 },
  { width: 272, height: 378, left: 140, top: 510, zIndex: 15, borderRadius: 20, delay: 0.5 },
  { width: 272, height: 292, left: 442, top: 548, zIndex: 15, borderRadius: 20, delay: 0.6 },
];

export function SelectedWorkSection({ isActive }: { isActive: boolean }) {
  const { portfolios } = usePortfolios();
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate("/portfolio", { state: { selectedId: id } });
  };

  return (
    <>
      {/* --- DESKTOP SELECTED WORK --- */}
      <div className="hidden md:flex relative w-full h-full justify-center items-center overflow-hidden">
        <div className="relative w-[1016px] h-[750px] origin-center scale-[0.3] sm:scale-[0.45] md:scale-[0.65] lg:scale-[0.85] xl:scale-100">
          <motion.div
            className="absolute top-[0px] left-[142px] z-[20]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-['Albert_Sans'] text-[34px] font-bold leading-[1.1] text-white m-0 tracking-[2px]">
              SELECTED<br />WORK
            </h2>
            <div className="w-[80px] h-[1px] bg-white mt-[25px]" />
          </motion.div>

          <motion.div
            className="absolute top-[240px] left-[142px] z-[40] font-['Albert_Sans'] text-[20px] font-medium text-white tracking-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            2008-2026
          </motion.div>

          <motion.div
            className="absolute top-[350px] left-[22px] -translate-y-1/2 font-['Licorice'] text-[280px] text-[#ff3b00] m-0 leading-[0.7] font-normal whitespace-nowrap z-[30] origin-left"
            initial={{ clipPath: "inset(-30% 100% -30% -30%)" }}
            animate={{ clipPath: isActive ? "inset(-30% -50% -30% -30%)" : "inset(-30% 100% -30% -30%)" }}
            transition={{ delay: 0.6, duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
          >
            P<span className="text-[260px] tracking-[0.03em]">ortfolio</span>
          </motion.div>

          {/* 실제 포트폴리오 썸네일 (최대 5개) */}
          {desktopStyles.map((style, idx) => {
            const proj = portfolios[idx];
            if (!proj) return null;
            return (
              <motion.img
                key={proj.id}
                src={proj.thumbnail_url}
                alt={proj.title}
                className="absolute object-cover shadow-[0_25px_50px_rgba(0,0,0,0.5)] cursor-pointer"
                style={{ width: style.width, height: style.height, left: style.left, top: style.top, zIndex: style.zIndex, borderRadius: style.borderRadius }}
                initial={{ opacity: 0, y: 60 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                whileHover={{ scale: 1.05, y: -10, zIndex: 50, transition: { duration: 0.3, ease: "easeOut" } }}
                transition={{ duration: 0.8, delay: isActive ? style.delay : 0, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleClick(proj.id)}
              />
            );
          })}

          <Link to="/portfolio" className="cursor-hover absolute left-[744px] top-[710px] z-[20] pointer-events-auto">
            <motion.div
              className="flex items-center gap-[15px] text-white font-['Albert_Sans'] text-[15px] font-normal no-underline hover:text-[#ff3b00] transition-colors group"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              View Portfolio
              <span className="text-[20px] font-light transition-transform duration-300 group-hover:translate-x-2">⟶</span>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* --- MOBILE SELECTED WORK --- */}
      <div className="flex md:hidden relative w-full h-full flex-col overflow-y-auto overflow-x-hidden pt-[110px] px-[20px] pb-[100px]">
        <motion.div
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} className="font-['Albert_Sans'] font-semibold text-[23.8px] text-white uppercase leading-[0.9]">
            <p className="m-0">Selected</p>
            <p className="m-0">Work</p>
          </motion.div>
          <motion.div variants={fadeUp} className="w-[53.2px] h-[0.7px] bg-white mt-[20px]" />
        </motion.div>

        <div className="relative mt-[50px] mb-[20px] w-full flex flex-col items-center">
          <motion.p
            className="font-['Albert_Sans'] text-[14px] text-white uppercase m-0 leading-[0.9] self-start ml-[35px]"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            2008-2026
          </motion.p>
          <motion.div
            className="flex items-center justify-center -skew-x-8 scale-y-[0.99] mt-[10px]"
            initial={{ clipPath: "inset(-30% 100% -30% -30%)" }}
            animate={{ clipPath: isActive ? "inset(-30% -30% -30% -30%)" : "inset(-30% 100% -30% -30%)" }}
            transition={{ delay: 0.5, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="font-['Licorice'] text-[#ff4600] m-0" style={{ textShadow: "0px 7.7px 7.7px rgba(0,0,0,0.3)" }}>
              <span className="text-[110px] tracking-[-2.2px] leading-[1]">P</span>
              <span className="text-[110px] leading-[1]">ortfolio</span>
            </p>
          </motion.div>
        </div>

        {/* 실제 포트폴리오 썸네일 그리드 (최대 4개) */}
        <div className="grid grid-cols-2 gap-[10px] w-full max-w-[400px] mx-auto z-10 px-0">
          {portfolios.slice(0, 4).map((proj, idx) => (
            <motion.div
              key={proj.id}
              className={`w-full ${idx < 2 ? "aspect-[176/239]" : "aspect-[175/184]"} rounded-[15px] overflow-hidden bg-[#222] cursor-pointer`}
              initial={{ opacity: 0, y: 40 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
              onClick={() => handleClick(proj.id)}
            >
              <img src={proj.thumbnail_url} alt={proj.title} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        <Link to="/portfolio" className="pointer-events-auto w-full max-w-[400px] mx-auto px-0">
          <motion.div
            className="flex items-center justify-end gap-[7px] mt-[20px] text-white w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <p className="font-['Albert_Sans'] text-[14px] m-0">
              <span className="capitalize">View </span>
              <span className="lowercase">portfolio</span>
            </p>
            <div className="w-[31px] h-[4.6px] relative flex items-center">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 6">
                <path d="M0 5H31L23 0.5" stroke="white" strokeWidth="1" />
              </svg>
            </div>
          </motion.div>
        </Link>
      </div>
    </>
  );
}
