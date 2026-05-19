import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function CareerSection({ isActive }: { isActive: boolean }) {
  return (
    <>
      {/* --- DESKTOP CAREER --- */}
      <div className="hidden md:flex relative w-full h-full justify-center items-center overflow-hidden">
        <div className="relative flex flex-col items-start z-10 w-max max-w-[100vw] px-[40px]">
          <motion.div
            className="mt-[-50px] mb-[100px] ml-[65px]"
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2 variants={fadeUp} className="font-['Albert_Sans'] text-[24px] md:text-[34px] font-bold leading-[0.9] text-white m-0 tracking-[1px] uppercase">
              Career<br />Experience
            </motion.h2>
            <motion.div variants={fadeUp} className="w-[60px] h-[1px] bg-white mt-[25px]" />
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start lg:items-start justify-start w-full gap-[60px] lg:gap-[80px]">
            <div className="relative w-[260px] flex flex-col lg:items-start items-start">
              <motion.div
                className="absolute top-0 left-[-15px] font-['Beau_Rivage'] text-[230px] text-[#ff3b00] leading-[0.72] z-[1] pointer-events-none tracking-[-0.05em]"
                initial={{ clipPath: "inset(-30% 100% -30% -30%)" }}
                animate={{ clipPath: isActive ? "inset(-30% -50% -30% -30%)" : "inset(-30% 100% -30% -30%)" }}
                transition={{ delay: 0.3, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              >
                16
              </motion.div>
              <motion.div
                className="relative z-[2] flex flex-col items-start pt-[72px] pl-0 lg:pl-[65px]"
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
                variants={{ visible: { transition: { delayChildren: 0.5, staggerChildren: 0.1 } } }}
              >
                <motion.span variants={fadeUp} className="font-['Albert_Sans'] text-[20px] font-medium text-white tracking-[1px] whitespace-nowrap mb-[110px]">
                  2000-2016
                </motion.span>
                <motion.div variants={fadeUp} className="mt-[50px] pl-0 text-left">
                  <h3 className="font-['Albert_Sans'] text-[22px] font-medium text-[#ff3b00] mb-[20px] mt-0">Officeworker</h3>
                  <ul className="list-none p-0 m-0">
                    {["E-Point", "Iluxury", "Prestigecom", "Seedpost", "Toppings", "Leelkang P&C"].map((item) => (
                      <li key={item} className="font-['Albert_Sans'] text-[14px] text-[#888888] leading-[1.9] font-normal tracking-[0.5px]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className="hidden lg:block font-['Albert_Sans'] text-[160px] font-[100] text-[#ff3b00] leading-[1.1] mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              /
            </motion.div>

            <div className="relative w-[260px] flex flex-col lg:items-start items-start">
              <motion.div
                className="absolute top-0 left-[-15px] font-['Beau_Rivage'] text-[230px] text-[#ff3b00] leading-[0.72] z-[1] pointer-events-none tracking-[-0.05em]"
                initial={{ clipPath: "inset(-30% 100% -30% -30%)" }}
                animate={{ clipPath: isActive ? "inset(-30% -50% -30% -30%)" : "inset(-30% 100% -30% -30%)" }}
                transition={{ delay: 0.7, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              >
                08
              </motion.div>
              <motion.div
                className="relative z-[2] flex flex-col items-start pt-[72px] pl-0 lg:pl-[85px]"
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
                variants={{ visible: { transition: { delayChildren: 0.9, staggerChildren: 0.1 } } }}
              >
                <motion.span variants={fadeUp} className="font-['Albert_Sans'] text-[20px] font-medium text-white tracking-[1px] whitespace-nowrap mb-[110px]">
                  2017- NOW
                </motion.span>
                <motion.div variants={fadeUp} className="mt-[50px] pl-0 text-left">
                  <h3 className="font-['Albert_Sans'] text-[22px] font-medium text-[#ff3b00] mb-[20px] mt-0">Freelancer</h3>
                  <ul className="list-none p-0 m-0">
                    {[
                      "Graphic Designer",
                      "Logo/Branding Designer",
                      "Package Designer",
                      "SNS Content Designer",
                      "UI/UX Designer",
                      "Detail Page Designer"
                    ].map((item) => (
                      <li key={item} className="font-['Albert_Sans'] text-[14px] text-[#888888] leading-[1.9] font-normal tracking-[0.5px]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE CAREER (Based on IPhone162) --- */}
      <div className="flex md:hidden relative w-full h-full flex-col overflow-y-auto overflow-x-hidden pt-[110px] px-[20px] pb-[100px]">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} className="font-['Albert_Sans'] font-semibold text-[23.8px] text-white uppercase leading-[0.9]">
            <p className="m-0">Career</p>
            <p className="m-0">Experience</p>
          </motion.div>
          <motion.div variants={fadeUp} className="w-[53.2px] h-[0.7px] bg-white mt-[20px]" />
        </motion.div>

        <div className="flex flex-col items-center mt-[40px] w-full">
          
          {/* 16 / 08 Block */}
          <div className="relative flex flex-row items-center justify-center w-full mt-[20px]">
            {/* 16 */}
            <motion.div
              className="relative"
              initial={{ clipPath: "inset(-30% 100% -30% -30%)" }}
              animate={{ clipPath: isActive ? "inset(-30% -30% -30% -30%)" : "inset(-30% 100% -30% -30%)" }}
              transition={{ delay: 0.3, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="font-['Beau_Rivage'] text-[110px] text-[#ff4600] leading-[0.9] tracking-[-5.5px]">16</span>
              <span className="absolute font-['Albert_Sans'] text-[14px] text-white font-normal uppercase leading-[0.9] mt-[43px] ml-[37px] top-0 left-0">
                2000-2016
              </span>
            </motion.div>

            {/* / */}
            <motion.span 
              className="font-['Albert_Sans'] font-thin text-[#ff4600] text-[80px] leading-[0.9] uppercase mx-[20px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              /
            </motion.span>

            {/* 08 */}
            <motion.div
              className="relative"
              initial={{ clipPath: "inset(-30% 100% -30% -30%)" }}
              animate={{ clipPath: isActive ? "inset(-30% -30% -30% -30%)" : "inset(-30% 100% -30% -30%)" }}
              transition={{ delay: 0.6, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="font-['Beau_Rivage'] text-[110px] text-[#ff4600] leading-[0.9] tracking-[-5.5px]">08</span>
              <span className="absolute font-['Albert_Sans'] text-[14px] text-white font-normal uppercase leading-[0.9] mt-[43px] ml-[36px] top-0 left-0">
                2017- now
              </span>
            </motion.div>
          </div>

          {/* Roles Block */}
          <div className="grid grid-cols-2 w-full mt-[40px] gap-[10px]">
            {/* Officeworker */}
            <motion.div
              className="flex flex-col items-center"
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
              variants={{ visible: { transition: { delayChildren: 0.5, staggerChildren: 0.1 } } }}
            >
              <motion.h3 variants={fadeUp} className="font-['Albert_Sans'] text-[16px] font-normal text-[#ff4600] mb-[15px] m-0 capitalize text-center">
                Officeworker
              </motion.h3>
              <motion.div variants={fadeUp} className="font-['Albert_Sans'] font-extralight text-[13px] text-white tracking-[0.26px] capitalize flex flex-col gap-[5px] text-center">
                {["E-point", "iluxury", "Prestigecom", "seedpost", "Toppings", "leelkang P&C"].map((item) => (
                  <span key={item} className="leading-[1.6]">{item}</span>
                ))}
              </motion.div>
            </motion.div>

            {/* Freelancer */}
            <motion.div
              className="flex flex-col items-center"
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
              variants={{ visible: { transition: { delayChildren: 0.8, staggerChildren: 0.1 } } }}
            >
              <motion.h3 variants={fadeUp} className="font-['Albert_Sans'] text-[16px] font-medium text-[#ff4600] mb-[15px] m-0 capitalize text-center">
                Freelancer
              </motion.h3>
              <motion.div variants={fadeUp} className="font-['Albert_Sans'] font-extralight text-[13px] text-white tracking-[0.26px] capitalize flex flex-col gap-[5px] text-center">
                {[
                  "Graphic Designer",
                  "Logo/Branding Designer",
                  "Package Designer",
                  "SNS Content Designer",
                  "UI/UX Designer",
                  "Detail Page Designer)"
                ].map((item) => (
                  <span key={item} className="leading-[1.6]">{item}</span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* View Portfolio Link removed as requested */}
        </div>
      </div>
    </>
  );
}
