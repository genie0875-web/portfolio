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
      <p className="-translate-x-full absolute font-['Albert_Sans:Medium',sans-serif] font-medium leading-[normal] left-[1409px] text-[14px] text-right text-white top-[30px] tracking-[1.4px] uppercase whitespace-nowrap">Portfolio</p>
      <div className="-translate-x-1/2 absolute font-['Albert_Sans:Black',sans-serif] font-black leading-[0] left-[calc(50%-65px)] text-[0px] text-[rgba(255,255,255,0.2)] text-center top-[calc(50%-189px)] uppercase whitespace-nowrap">
        <p className="leading-[0.8] mb-0 text-[170px]">KANG</p>
        <p className="leading-[0.8] mb-0 text-[170px] tracking-[5.1px]">HYUN</p>
        <p className="leading-[0.8] text-[170px] tracking-[13.6px]">JUNG</p>
      </div>
      <p className="absolute font-['Didot:Regular',sans-serif] leading-[0.9] left-[425px] lowercase not-italic text-[40px] text-[transparent] top-[522px] whitespace-nowrap">year</p>
      <Frame1 />
      <div className="absolute flex h-[321.837px] items-center justify-center left-[297.77px] top-[416px] w-[706.231px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-skew-x-8 flex-none scale-y-99">
          <p className="font-['Licorice:Regular',sans-serif] leading-[100.01499938964844%] not-italic relative text-[#ff4600] text-[260px] tracking-[7.8px] whitespace-nowrap">Designer</p>
        </div>
      </div>
      <div className="absolute font-['Albert_Sans:SemiBold',sans-serif] font-semibold leading-[0] left-[411px] text-[34px] text-white top-[180px] uppercase whitespace-nowrap">
        <p className="leading-[0.9] mb-0">HELLO</p>
        <p className="leading-[0.9]">I am</p>
      </div>
      <div className="absolute h-0 left-[411px] top-[282px] w-[76px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76 1">
            <line id="Line 1" stroke="var(--stroke-0, white)" x2="76" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="absolute capitalize font-['FreesentationVF:3_Light',sans-serif] font-[320] leading-[1.4] left-[410px] text-[#ff4600] text-[20px] top-[799px] whitespace-nowrap">
        안녕하세요
        <br aria-hidden="true" />
        UI/UX/bX 디자이너 강현정입니다.
      </p>
      <p className="absolute font-['Albert_Sans:Medium',sans-serif] font-medium leading-[normal] left-[30px] text-[14px] text-white top-[1033px] tracking-[1.4px] uppercase whitespace-nowrap">©2026</p>
    </div>
  );
}