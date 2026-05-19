import svgPaths from "./svg-bynx2tcdys";

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[5.88px] items-center left-[138px] top-[1678.08px]">
      <p className="capitalize font-['Albert_Sans:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[13.44px] text-white w-[86.52px]">
        <span className="leading-[0.9]">{`View `}</span>
        <span className="leading-[0.9] lowercase">portfolio</span>
      </p>
      <div className="h-[3.88px] relative shrink-0 w-[26.04px]">
        <div className="absolute inset-[-9.38%_-6.02%_-10.83%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.6074 4.66358">
            <path d={svgPaths.p2c64bf00} id="Vector 1" stroke="var(--stroke-0, white)" strokeWidth="0.84" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function IPhone() {
  return (
    <div className="bg-[#131313] relative size-full" data-name="iPhone 16 - 2">
      <div className="absolute font-['Albert_Sans:SemiBold',sans-serif] font-semibold leading-[0] left-[20px] text-[23.8px] text-white top-[84px] uppercase whitespace-nowrap">
        <p className="leading-[0.9] mb-0">Career</p>
        <p className="leading-[0.9]">Experience</p>
      </div>
      <div className="absolute h-0 left-[20px] top-[156px] w-[53.2px]">
        <div className="absolute inset-[-0.7px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.2 0.7">
            <line id="Line 1" stroke="var(--stroke-0, white)" strokeWidth="0.7" x2="53.2" y1="0.35" y2="0.35" />
          </svg>
        </div>
      </div>
      <Frame />
      <p className="absolute font-['Beau_Rivage:Regular',sans-serif] leading-[0.9] left-[30px] not-italic text-[#ff4600] text-[110px] top-[216px] tracking-[-5.5px] uppercase whitespace-nowrap">16</p>
      <p className="absolute font-['Albert_Sans:Regular',sans-serif] font-normal leading-[0.9] left-[67px] text-[14px] text-white top-[259px] uppercase whitespace-nowrap">2000-2016</p>
      <p className="-translate-x-1/2 absolute capitalize font-['Albert_Sans:Regular',sans-serif] font-normal leading-none left-[92px] text-[#ff4600] text-[16px] text-center top-[343px] whitespace-nowrap">Officeworker</p>
      <div className="-translate-x-1/2 absolute capitalize font-['Albert_Sans:ExtraLight',sans-serif] font-extralight leading-[0] left-[92px] text-[13px] text-center text-white top-[371px] tracking-[0.26px] whitespace-nowrap">
        <p className="leading-[1.6] mb-0">E-point</p>
        <p className="leading-[1.6] mb-0">iluxury</p>
        <p className="leading-[1.6] mb-0">Prestigecom</p>
        <p className="leading-[1.6] mb-0">seedpost</p>
        <p className="leading-[1.6] mb-0">Toppings</p>
        <p className="leading-[1.6]">{`leelkang P&C`}</p>
      </div>
      <p className="absolute font-['Beau_Rivage:Regular',sans-serif] leading-[0.9] left-[201px] not-italic text-[#ff4600] text-[110px] top-[224px] tracking-[-5.5px] uppercase whitespace-nowrap">08</p>
      <p className="absolute font-['Albert_Sans:Regular',sans-serif] font-normal leading-[0.9] left-[237px] text-[14px] text-white top-[267px] uppercase whitespace-nowrap">2017- now</p>
      <div className="-translate-x-1/2 absolute capitalize font-['Albert_Sans:ExtraLight',sans-serif] font-extralight leading-[0] left-[276px] text-[13px] text-center text-white top-[374px] tracking-[0.26px] whitespace-nowrap">
        <p className="leading-[1.6] mb-0">Graphic Designer</p>
        <p className="leading-[1.6] mb-0">Logo/Branding Designer</p>
        <p className="leading-[1.6] mb-0">Package Designer</p>
        <p className="leading-[1.6] mb-0">SNS Content Designer</p>
        <p className="leading-[1.6] mb-0">UI/UX Designer</p>
        <p className="leading-[1.6]">Detail Page Designer)</p>
      </div>
      <p className="-translate-x-1/2 absolute capitalize font-['Albert_Sans:Medium',sans-serif] font-medium leading-none left-[276px] text-[#ff4600] text-[16px] text-center top-[346px] whitespace-nowrap">Freelancer</p>
      <p className="absolute font-['Albert_Sans:Medium',sans-serif] font-medium leading-[normal] left-[20px] text-[12px] text-white top-[20px] tracking-[1.2px] uppercase whitespace-nowrap">about</p>
      <p className="-translate-x-full absolute font-['Albert_Sans:Medium',sans-serif] font-medium leading-[normal] left-[373px] text-[12px] text-right text-white top-[20px] tracking-[1.2px] uppercase whitespace-nowrap">Portfolio</p>
      <p className="absolute font-['Albert_Sans:Thin',sans-serif] font-thin leading-[0.9] left-[calc(50%-19.5px)] text-[#ff4600] text-[80px] top-[231px] uppercase whitespace-nowrap">/</p>
    </div>
  );
}