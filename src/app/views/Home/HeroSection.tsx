import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroSection({ isActive }: { isActive: boolean }) {
  return (
    <>
      {/* --- DESKTOP HERO --- */}
      <div className="hidden md:flex absolute inset-0 justify-center items-center overflow-hidden mb-[100px]">
        <div className="relative flex flex-col items-start justify-center z-20 pointer-events-none">
          <motion.div
            className="pointer-events-auto text-left mb-[70px]"
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2 variants={fadeUp} className="font-['Albert_Sans'] text-[24px] md:text-[34px] font-semibold leading-[0.9] text-white m-0 uppercase">
              HELLO<br />I am
            </motion.h2>
            <motion.div variants={fadeUp} className="w-[76px] h-[1px] bg-white mt-[25px]" />
          </motion.div>

          <div className="relative">
            <motion.div
              className="font-['Albert_Sans'] text-[15vw] md:text-[170px] font-black leading-[0.8] text-[rgba(255,255,255,0.08)] m-0 uppercase whitespace-nowrap flex flex-col items-start select-none z-0"
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, scale: 0.95, originX: 0 },
                visible: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <p className="m-0 leading-[0.8]">KANG</p>
              <p className="m-0 leading-[0.8] tracking-[1.5vw] md:tracking-[5.1px]">HYUN</p>
              <p className="m-0 leading-[0.8] tracking-[4vw] md:tracking-[13.6px]">JUNG</p>
            </motion.div>

            <motion.div
              className="absolute top-1/2 left-[calc(-3vw-30px)] md:left-[-60px] -translate-y-1/2 pointer-events-none select-none -skew-x-8 z-10"
              initial={{ clipPath: "inset(-30% 100% -30% -30%)" }}
              animate={{ clipPath: isActive ? "inset(-30% -50% -30% -30%)" : "inset(-30% 100% -30% -30%)" }}
              transition={{ delay: 0.8, duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="font-['Licorice'] text-[24vw] md:text-[260px] font-normal text-[#ff4600] whitespace-nowrap tracking-[1vw] md:tracking-[7.8px] leading-[1] inline-block mt-[3vw] md:mt-[30px]">
                Designer
              </span>
            </motion.div>
          </div>

          <motion.p
            className="text-[#ff4600] text-[16px] md:text-[20px] leading-[1.4] font-['Noto_Sans_KR'] font-light m-0 pointer-events-auto text-left mt-[40px]"
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            경험을 디자인하고, 감각적인 가치를 만들어내는<br />
            사용자 중심의 UI/UX 디자이너 강현정입니다.
          </motion.p>
        </div>
      </div>

      {/* --- MOBILE HERO (Based on IPhone164) --- */}
      <div className="flex md:hidden absolute inset-0 flex-col items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute top-[110px] left-[20px]"
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p variants={fadeUp} className="font-['Albert_Sans'] font-semibold text-[23.8px] text-white uppercase leading-[0.9] m-0">HELLO<br/>I am</motion.p>
          <motion.div variants={fadeUp} className="w-[53.2px] h-[1px] bg-white mt-[25px]" />
        </motion.div>

        <div className="relative flex flex-col items-center justify-center w-full mt-[20px]">
          <motion.div
            className="font-['Albert_Sans'] font-black text-[80px] leading-[0.8] text-[rgba(255,255,255,0.2)] tracking-[-1.6px] text-center uppercase z-0"
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <p className="m-0">KANG</p>
            <p className="m-0">HYUN</p>
            <p className="m-0">JUNG</p>
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-[45%] -skew-x-8 z-10"
            initial={{ clipPath: "inset(-30% 100% -30% -30%)" }}
            animate={{ clipPath: isActive ? "inset(-30% -30% -30% -30%)" : "inset(-30% 100% -30% -30%)" }}
            transition={{ delay: 0.8, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          >
             <p className="font-['Licorice'] text-[#ff4600] text-[110px] tracking-[-2.2px] leading-[1] m-0" style={{ textShadow: "0px 8.4px 8.4px rgba(0,0,0,0.3)" }}>Designer</p>
          </motion.div>
        </div>

        <motion.div
          className="mt-[40px] w-full px-[20px] flex justify-center z-20"
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          <div className="text-center">
            <p className="font-['Pretendard'] text-[#ff4600] text-[13px] leading-[1.6] m-0">
              경험을 디자인하고, 감각적인 가치를 만들어내는<br/>
              사용자 중심의 UI/UX 디자이너 강현정입니다.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
