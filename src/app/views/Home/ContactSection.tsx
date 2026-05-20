import { motion } from "motion/react";

export function ContactSection({ isActive }: { isActive: boolean }) {
  return (
    <>
      {/* --- DESKTOP CONTACT --- */}
      <div className="hidden md:flex relative w-full min-h-full flex-col justify-center items-center overflow-hidden py-[80px]">
        <motion.div
          className="w-full max-w-[1050px] mx-auto relative z-10 px-[40px] xl:px-0 flex flex-col mt-[30px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-full max-w-[460px] mx-auto text-left mb-[70px] relative left-[10px]">
            <h2 className="font-['Albert_Sans'] font-semibold leading-[1.1] text-[34px] text-white uppercase m-0 tracking-[2px]">
              contact
            </h2>
            <div className="w-[50px] h-[1px] bg-white mt-[20px]" />
          </div>

          <div className="relative w-[100vw] left-1/2 -translate-x-1/2 text-center mb-[50px] select-none flex flex-col justify-center items-center pointer-events-none">
            <div className="font-['Albert_Sans'] text-[120px] font-black leading-[0.8] text-[#333333] m-0 tracking-[-2px] text-center uppercase whitespace-nowrap">
              <p className="m-0 flex justify-center">
                <span>Wh</span><span className="tracking-[-8.4px]">a</span><span>t</span>
              </p>
              <p className="m-0 flex justify-center">
                <span>do</span><span className="tracking-[-14.4px]">&nbsp;</span><span className="tracking-[-9.6px]">y</span><span>ou</span>
              </p>
              <p className="m-0 flex justify-center">
                <span>actual</span><span className="tracking-[-15.6px]">l</span><span>y</span>
              </p>
              <p className="m-0 flex justify-center">
                <span className="tracking-[-9.6px]">w</span><span>ant?</span>
              </p>
            </div>
            
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none mt-[-10px]"
              initial={{ clipPath: "inset(-30% 100% -30% -30%)" }}
              animate={{ clipPath: isActive ? "inset(-30% -50% -30% -30%)" : "inset(-30% 100% -30% -30%)" }}
              transition={{ delay: 0.5, duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="font-['Licorice'] text-[260px] font-normal text-[#ff4600] whitespace-nowrap leading-[1] drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)]">
                <span>H</span><span className="tracking-[7.8px]">onestly</span>
              </span>
            </motion.div>
          </div>

          <div className="w-full max-w-[400px] mx-auto text-left relative font-['Noto_Sans_KR'] text-[15px] leading-[1.8] text-[#d1d1d1] font-light break-keep pb-[50px] z-20 pointer-events-none">
            <p className="font-medium text-[#ff4600] mb-[20px] whitespace-nowrap pointer-events-auto">당신은 어떤 디자이너를 원하나요?</p>
            <p className="mb-0 whitespace-nowrap pointer-events-auto">문제 해결보다 속도를 택하는 디자이너?</p>
            <p className="mb-0 whitespace-nowrap pointer-events-auto">수정 요청에 무조건 따르거나, 무조건 거부하는 디자이너?</p>
            <p className="mb-[30px] whitespace-nowrap pointer-events-auto">과거 방식만 고수하고, 자기 스타일만 고집하는 디자이너?</p>
            <p className="mb-0 whitespace-nowrap pointer-events-auto">지금까지 언급한 디자이너는 업계에서 가장 먼저 퇴출당하는 1순위입니다.</p>
            <p className="mb-[30px] whitespace-nowrap pointer-events-auto">그리고 지금, 한 명이 더 추가됐습니다.</p>
            <p className="mb-0 whitespace-nowrap pointer-events-auto">AI를 모른 척하며 10년 전 방식으로만 일하는 디자이너.</p>
            <p className="mb-[60px] whitespace-nowrap pointer-events-auto">AI는 도구입니다. 방향을 잡는 건 여전히 사람입니다.</p>
            <p className="font-medium text-[#ff4600] mb-[20px] whitespace-nowrap pointer-events-auto mt-[60px]">솔직히 말씀드리겠습니다.</p>
            <p className="mb-[30px] whitespace-nowrap pointer-events-auto">클라이언트의 요청이 항상 옳지는 않습니다.</p>
            <p className="mb-0 whitespace-nowrap pointer-events-auto">"이렇게 해주세요"가 브랜드를 망치는 방향일 때,</p>
            <p className="mb-[30px] whitespace-nowrap pointer-events-auto">저는 그냥 만들지 않습니다.</p>
            <p className="mb-[30px] whitespace-nowrap pointer-events-auto">왜 안 되는지, 뭐가 더 나은지 — 데이터와 논리로 설득합니다.</p>
            <p className="mb-0 whitespace-nowrap pointer-events-auto">불편한 말을 꺼낼 수 있는 디자이너.</p>
            <p className="mb-[30px] whitespace-nowrap pointer-events-auto">그게 결국 클라이언트의 브랜드를 지키는 디자이너입니다.</p>
            <p className="mb-[30px] whitespace-nowrap pointer-events-auto">클라이언트가 진짜 원하는 건 따로 있습니다.</p>
            <p className="mb-0 whitespace-nowrap pointer-events-auto">빠른 납품이 아닌, 믿고 맡길 수 있는 사람.</p>
            <p className="mb-0 whitespace-nowrap pointer-events-auto">예쁜 디자인이 아닌, 문제를 해결하는 디자인.</p>
            <p className="mb-[30px] whitespace-nowrap pointer-events-auto">AI 활용이 아닌, AI로 더 나은 결과를 내는 판단력.</p>
            <p className="mb-[30px] whitespace-nowrap pointer-events-auto">아이디어가 반쪽이어도 괜찮습니다.</p>
            <p className="mb-0 whitespace-nowrap pointer-events-auto">모호한 생각을 구체적인 방향으로 만드는 것.</p>
            <p className="mb-[30px] whitespace-nowrap pointer-events-auto">그게 제 역할입니다.</p>
            <p className="mb-0 whitespace-nowrap pointer-events-auto">지금 첫 문장을 보내주세요.</p>
            <p className="mb-[80px] whitespace-nowrap pointer-events-auto">"이런 프로젝트인데요—" 한 줄이면 충분합니다.</p>
          </div>
        </motion.div>
      </div>

      {/* --- MOBILE CONTACT --- */}
      <div className="flex md:hidden relative w-full min-h-[100dvh] flex-col overflow-y-auto overflow-x-hidden pt-[110px] px-[20px] pb-[60px]">
        <motion.div
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
          }}
        >
          <p className="font-['Albert_Sans'] font-semibold text-[23.8px] text-white uppercase leading-[0.9] m-0">contact</p>
          <div className="w-[53.2px] h-[0.7px] bg-white mt-[20px]" />
        </motion.div>

        <div className="relative w-full flex flex-col items-center mt-[60px] mb-[60px]">
          <motion.div
            className="font-['Albert_Sans'] text-[65px] font-black leading-[0.8] text-[rgba(255,255,255,0.2)] m-0 tracking-[-1.3px] text-center uppercase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="m-0">Wh<span className="tracking-[-4.55px]">a</span>t</p>
            <p className="m-0">do<span className="tracking-[-7.8px]">&nbsp;</span><span className="tracking-[-5.2px]">y</span>ou</p>
            <p className="m-0">actual<span className="tracking-[-8.45px]">l</span>y</p>
            <p className="m-0"><span className="tracking-[-5.2px]">w</span>ant?</p>
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -skew-x-8 z-10 w-max"
            initial={{ clipPath: "inset(-30% 100% -30% -30%)" }}
            animate={{ clipPath: isActive ? "inset(-30% -30% -30% -30%)" : "inset(-30% 100% -30% -30%)" }}
            transition={{ delay: 0.5, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="font-['Licorice'] text-[110px] text-[#ff4600] m-0 leading-[1]" style={{ textShadow: "0px 8.4px 8.4px rgba(0,0,0,0.3)" }}>
              H<span className="tracking-[3.3px]">onestly</span>
            </p>
          </motion.div>
        </div>

        <motion.div
          className="w-full flex flex-col items-center px-0 font-['Pretendard'] text-[13px] text-white font-light leading-[1.6] text-center whitespace-nowrap max-w-[340px] mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="text-[#ff4600] font-semibold mb-0">당신은 어떤 디자이너를 원하나요?</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">문제 해결보다 속도를 택하는 디자이너?</p>
          <p className="mb-0">수정 요청에 무조건 따르거나,</p>
          <p className="mb-0">무조건 거부하는 디자이너? 과거 방식만 고수하고,</p>
          <p className="mb-[20px]">자기 스타일만 고집하는 디자이너?</p>
          <p className="mb-0">지금까지 언급한 디자이너는</p>
          <p className="mb-0">업계에서 가장 먼저 퇴출당하는 1순위입니다.</p>
          <p className="mb-[20px]">그리고 지금, 한 명이 더 추가됐습니다.</p>
          <p className="mb-0">AI를 모른 척하며 10년 전 방식으로만 일하는 디자이너.</p>
          <p className="mb-[40px]">AI는 도구입니다. 방향을 잡는 건 여전히 사람입니다.</p>
          <p className="text-[#ff4600] font-medium mb-0">솔직히 말씀드리겠습니다.</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-[20px]">클라이언트의 요청이 항상 옳지는 않습니다.</p>
          <p className="mb-0">"이렇게 해주세요"가 브랜드를 망치는 방향일 때,</p>
          <p className="mb-[20px]">저는 그냥 만들지 않습니다.</p>
          <p className="mb-0">왜 안 되는지, 뭐가 더 나은지</p>
          <p className="mb-[20px]">데이터와 논리로 설득합니다.</p>
          <p className="mb-0">불편한 말을 꺼낼 수 있는 디자이너.</p>
          <p className="mb-0">그게 결국 클라이언트의 브랜드를 지키는</p>
          <p className="mb-[20px]">디자이너입니다.</p>
          <p className="mb-[20px]">클라이언트가 진짜 원하는 건 따로 있습니다.</p>
          <p className="mb-0">빠른 납품이 아닌, 믿고 맡길 수 있는 사람.</p>
          <p className="mb-0">예쁜 디자인이 아닌, 문제를 해결하는 디자인.</p>
          <p className="mb-[20px]">AI 활용이 아닌, AI로 더 나은 결과를 내는 판단력.</p>
          <p className="mb-[20px]">아이디어가 반쪽이어도 괜찮습니다.</p>
          <p className="mb-0">모호한 생각을 구체적인 방향으로 만드는 것.</p>
          <p className="mb-[20px]">그게 제 역할입니다.</p>
          <p className="mb-0">지금 첫 문장을 보내주세요.</p>
          <p className="mb-[60px]">"이런 프로젝트인데요—" 한 줄이면 충분합니다.</p>
        </motion.div>
      </div>
    </>
  );
}
