function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 text-white w-full">
      <p className="relative shrink-0 text-center uppercase w-full">01</p>
      <p className="capitalize relative shrink-0 text-right w-full">Hello</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col font-['Albert_Sans:Medium',sans-serif] font-medium gap-[51px] items-center leading-[normal] left-[1376px] text-[12px] top-[444px] w-[32px]">
      <Frame />
      <p className="relative shrink-0 text-[rgba(255,255,255,0.5)] text-center uppercase w-full">02</p>
      <p className="relative shrink-0 text-[rgba(255,255,255,0.5)] text-center uppercase w-full">03</p>
      <p className="relative shrink-0 text-[rgba(255,255,255,0.5)] text-center uppercase w-full">04</p>
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="bg-[#131313] relative size-full">
      <p className="absolute decoration-[8.5%] decoration-solid font-['Albert_Sans:Medium',sans-serif] font-medium leading-[normal] left-[30px] text-[14px] text-white top-[30px] tracking-[1.4px] underline uppercase whitespace-nowrap">Home</p>
      <p className="absolute font-['Albert_Sans:Medium',sans-serif] font-medium leading-[normal] left-[30px] text-[14px] text-white top-[2015px] tracking-[1.4px] uppercase whitespace-nowrap">©2026</p>
      <p className="-translate-x-full absolute font-['Albert_Sans:Medium',sans-serif] font-medium leading-[normal] left-[1409px] text-[14px] text-right text-white top-[30px] tracking-[1.4px] uppercase whitespace-nowrap">Portfolio</p>
      <p className="absolute font-['Didot:Regular',sans-serif] leading-[0.9] left-[425px] lowercase not-italic text-[40px] text-[transparent] top-[462px] whitespace-nowrap">year</p>
      <Frame1 />
      <p className="absolute font-['Albert_Sans:SemiBold',sans-serif] font-semibold leading-[0.9] left-[463px] text-[34px] text-white top-[120px] uppercase whitespace-nowrap">contact</p>
      <div className="absolute h-0 left-[463px] top-[191px] w-[76px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76 1">
            <line id="Line 1" stroke="var(--stroke-0, white)" x2="76" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute font-['Albert_Sans:Black',sans-serif] font-black leading-[0] left-1/2 text-[0px] text-[rgba(255,255,255,0.2)] text-center top-[calc(50%-783.5px)] tracking-[-2.4px] uppercase whitespace-nowrap">
        <p className="mb-0 text-[120px]">
          <span className="leading-[0.8]">Wh</span>
          <span className="leading-[0.8] tracking-[-8.4px]">a</span>
          <span className="leading-[0.8]">t</span>
        </p>
        <p className="mb-0 text-[120px]">
          <span className="leading-[0.8]">do</span>
          <span className="leading-[0.8] tracking-[-14.4px]">{` `}</span>
          <span className="leading-[0.8] tracking-[-9.6px]">y</span>
          <span className="leading-[0.8]">ou</span>
        </p>
        <p className="mb-0 text-[120px]">
          <span className="leading-[0.8]">actual</span>
          <span className="leading-[0.8] tracking-[-15.6px]">l</span>
          <span className="leading-[0.8]">y</span>
        </p>
        <p className="text-[120px]">
          <span className="leading-[0.8] tracking-[-9.6px]">w</span>
          <span className="leading-[0.8]">ant?</span>
        </p>
      </div>
      <div className="absolute capitalize font-['FreesentationVF:3_Light',sans-serif] font-[320] leading-[0] left-[475px] text-[0px] text-white top-[763px] whitespace-nowrap">
        <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.6] mb-0 not-italic text-[#ff4600] text-[18px] whitespace-pre">당신은 어떤 디자이너를 원하나요?</p>
        <p className="leading-[1.6] mb-0 text-[18px] whitespace-pre">&nbsp;</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">{`문제 해결보다 속도를 택하는 디자이너? `}</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">수정 요청에 무조건 따르거나, 무조건 거부하는 디자이너?</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">
          과거 방식만 고수하고, 자기 스타일만 고집하는 디자이너?
          <br aria-hidden="true" />
          <br aria-hidden="true" />
        </p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">지금까지 언급한 디자이너는 업계에서 가장 먼저 퇴출당하는 1순위입니다.</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">그리고 지금, 한 명이 더 추가됐습니다.</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">
          <br aria-hidden="true" />
          AI를 모른 척하며 10년 전 방식으로만 일하는 디자이너.
        </p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] not-italic text-[18px] whitespace-pre">AI는 도구입니다. 방향을 잡는 건 여전히 사람입니다.</p>
      </div>
      <div className="absolute capitalize font-['FreesentationVF:3_Light',sans-serif] font-[320] leading-[0] left-[475px] text-[0px] text-white top-[1132px] whitespace-nowrap">
        <p className="font-['Pretendard:Medium',sans-serif] leading-[1.6] mb-0 not-italic text-[#ff4600] text-[18px] whitespace-pre">솔직히 말씀드리겠습니다.</p>
        <p className="leading-[1.6] mb-0 text-[18px] whitespace-pre">&nbsp;</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">
          클라이언트의 요청이 항상 옳지는 않습니다.
          <br aria-hidden="true" />
          <br aria-hidden="true" />
        </p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">{`"이렇게 해주세요"가 브랜드를 망치는 방향일 때, `}</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">저는 그냥 만들지 않습니다.</p>
        <p className="leading-[1.6] mb-0 text-[18px] whitespace-pre">&nbsp;</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">
          왜 안 되는지, 뭐가 더 나은지 — 데이터와 논리로 설득합니다.
          <br aria-hidden="true" />
          <br aria-hidden="true" />
        </p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">{`불편한 말을 꺼낼 수 있는 디자이너. `}</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">그게 결국 클라이언트의 브랜드를 지키는 디자이너입니다.</p>
        <p className="leading-[1.6] mb-0 text-[18px] whitespace-pre">&nbsp;</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">클라이언트가 진짜 원하는 건 따로 있습니다.</p>
        <p className="leading-[1.6] mb-0 text-[18px] whitespace-pre">&nbsp;</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">{`빠른 납품이 아닌, 믿고 맡길 수 있는 사람. `}</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">{`예쁜 디자인이 아닌, 문제를 해결하는 디자인. `}</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">AI 활용이 아닌, AI로 더 나은 결과를 내는 판단력.</p>
        <p className="leading-[1.6] mb-0 text-[18px] whitespace-pre">&nbsp;</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">아이디어가 반쪽이어도 괜찮습니다.</p>
        <p className="leading-[1.6] mb-0 text-[18px] whitespace-pre">&nbsp;</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">모호한 생각을 구체적인 방향으로 만드는 것.</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">그게 제 역할입니다.</p>
        <p className="leading-[1.6] mb-0 text-[18px] whitespace-pre">&nbsp;</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] mb-0 not-italic text-[18px] whitespace-pre">{`지금 첫 문장을 보내주세요. `}</p>
        <p className="font-['Pretendard:Light',sans-serif] leading-[1.6] not-italic text-[18px] whitespace-pre">{`"이런 프로젝트인데요—" 한 줄이면 충분합니다.`}</p>
      </div>
      <p className="absolute decoration-solid font-['Albert_Sans:Light',sans-serif] font-light leading-[1.4] left-[475px] lowercase text-[18px] text-white top-[1884px] underline whitespace-nowrap">genie0875@gmail.com</p>
      <div className="absolute flex h-[321.837px] items-center justify-center left-[317.77px] top-[333px] w-[786.231px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-skew-x-8 flex-none scale-y-99">
          <p className="font-['Licorice:Regular',sans-serif] leading-[0] not-italic relative text-[#ff4600] text-[0px] text-shadow-[0px_20px_20px_rgba(0,0,0,0.3)] tracking-[-5.2px] whitespace-nowrap">
            <span className="leading-[100.01499938964844%] text-[260px]">H</span>
            <span className="leading-[100.01499938964844%] text-[260px] tracking-[7.8px]">onestly</span>
          </p>
        </div>
      </div>
    </div>
  );
}