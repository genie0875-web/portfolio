import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useLocation } from "react-router";
import { usePortfolios, Portfolio } from "../../hooks/usePortfolios";

/**
 * detail_html 이 있을 때 쓰는 렌더러.
 * iframe(srcDoc)으로 띄워서 사이트의 Tailwind/전역 스타일과 섞이지 않게 격리하고,
 * 내용 높이에 맞춰 iframe 높이를 자동으로 맞춘다.
 */
function HtmlDetail({ html }: { html: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(900);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    let ro: ResizeObserver | null = null;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const fit = () => {
      const doc = el.contentDocument;
      if (!doc) return;
      const h = Math.max(
        doc.documentElement?.scrollHeight ?? 0,
        doc.body?.scrollHeight ?? 0
      );
      if (h > 0) setHeight(h);
    };

    const onLoad = () => {
      fit();
      const doc = el.contentDocument;
      if (doc?.documentElement) {
        ro = new ResizeObserver(fit);
        ro.observe(doc.documentElement);
        doc.querySelectorAll("img").forEach((img) =>
          img.addEventListener("load", fit)
        );
      }
      // 웹폰트·이미지가 늦게 뜰 때를 위한 보정
      [300, 900, 2000].forEach((ms) => timers.push(setTimeout(fit, ms)));
    };

    el.addEventListener("load", onLoad);
    if (el.contentDocument?.readyState === "complete") onLoad();

    return () => {
      el.removeEventListener("load", onLoad);
      ro?.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [html]);

  return (
    <iframe
      ref={frameRef}
      srcDoc={html}
      title="project detail"
      scrolling="no"
      style={{ width: "100%", height, border: 0, display: "block" }}
    />
  );
}

export function PortfolioView() {
  const { portfolios, loading } = usePortfolios();
  const location = useLocation();
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // ✅ 추가
  const [isReady, setIsReady] = useState(false);
  const [cols, setCols] = useState(5);
  const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null);
  const [isDetailActive, setIsDetailActive] = useState(false);

  const projects = portfolios;

  const handleItemClick = (proj: Portfolio) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); // ✅ 진행중 타임아웃 취소
    setSelectedProject(proj);
    setIsDetailActive(true);
    setIsAutoScrolling(false);
    if (detailRef.current) detailRef.current.scrollTop = 0;
  };

  const handleCloseDetail = () => {
    setIsDetailActive(false);
    closeTimeoutRef.current = setTimeout(() => { // ✅ ref로 추적
      setSelectedProject(null);
      setIsAutoScrolling(true);
    }, 800);
  };

  useEffect(() => {
    const selectedId = (location.state as { selectedId?: string })?.selectedId;
    if (selectedId && portfolios.length > 0) {
      const found = portfolios.find((p) => p.id === selectedId);
      if (found) {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setSelectedProject(found);
        setIsDetailActive(true);
        setIsAutoScrolling(false);
      }
    }
  }, [location.state, portfolios]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) setCols(5);
      else if (width >= 900) setCols(3);
      else setCols(2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const scrollStartTimer = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 3000);
    return () => clearTimeout(scrollStartTimer);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let userScrollTimeout: ReturnType<typeof setTimeout>;
    let currentScrollY = containerRef.current?.scrollTop || 0;
    const speed = 0.3;

    const scrollLoop = () => {
      if (isAutoScrolling && containerRef.current) {
        currentScrollY += speed;
        containerRef.current.scrollTop = currentScrollY;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          currentScrollY = 0;
          containerRef.current.scrollTop = 0;
        } else if (Math.abs(currentScrollY - scrollTop) > 2) {
          currentScrollY = scrollTop;
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    const pauseScroll = () => {
      setIsAutoScrolling(false);
      clearTimeout(userScrollTimeout);
      userScrollTimeout = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 2500);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", pauseScroll, { passive: true });
      container.addEventListener("touchmove", pauseScroll, { passive: true });
    }
    if (isAutoScrolling) {
      animationFrameId = requestAnimationFrame(scrollLoop);
    }
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(userScrollTimeout);
      if (container) {
        container.removeEventListener("wheel", pauseScroll);
        container.removeEventListener("touchmove", pauseScroll);
      }
    };
  }, [isAutoScrolling]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#131313]">
        <p className="text-white/50 text-sm">Loading...</p>
      </div>
    );
  }

  const aspectPatterns = [
    ["aspect-[3/4]", "aspect-[2/3]", "aspect-[4/5]", "aspect-[1/1]", "aspect-[3/5]"],
    ["aspect-[1/1]", "aspect-[4/5]", "aspect-[3/5]", "aspect-[3/4]", "aspect-[2/3]"],
    ["aspect-[4/5]", "aspect-[3/5]", "aspect-[1/1]", "aspect-[2/3]", "aspect-[3/4]"],
    ["aspect-[2/3]", "aspect-[1/1]", "aspect-[3/4]", "aspect-[3/5]", "aspect-[4/5]"],
    ["aspect-[3/5]", "aspect-[3/4]", "aspect-[2/3]", "aspect-[4/5]", "aspect-[1/1]"],
  ];

  return (    
    <>
      <div
        ref={containerRef}
        className="w-full h-screen overflow-y-auto overflow-x-hidden bg-[#131313] pt-[100px]"
      >
        {(() => {
          const columnsData = Array.from({ length: cols }, () => [] as (Portfolio & { originalIndex: number })[]);
          projects.forEach((proj, idx) => columnsData[idx % cols].push({ ...proj, originalIndex: idx }));
          return (
            <div className="flex w-full gap-[10px] md:gap-[20px] items-start mx-auto max-w-[1600px] px-[10px] md:px-[40px]">
              {columnsData.map((colItems, colIndex) => (
                <div key={`col-${colIndex}`} className="flex flex-col flex-1 gap-[10px] md:gap-[20px]">
                  {colItems.map((proj, colItemIndex) => {
                    const i = proj.originalIndex;
                    const currentItemColIndex = i % cols;
                    const isMovingUp = currentItemColIndex % 2 === 0;
                    const initialY = isMovingUp ? 250 : -250;
                    const patternIndex = colIndex % aspectPatterns.length;
                    const aspectClass = aspectPatterns[patternIndex][colItemIndex % aspectPatterns[patternIndex].length];

                    return (
                      <motion.div
                        key={`${proj.id}-${i}`}
                        onClick={() => handleItemClick(proj)}
                        className="relative overflow-hidden rounded-[18px] bg-[#222] cursor-pointer group w-full"
                        initial={{ opacity: 0, y: initialY }}
                        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: initialY }}
                        transition={{
                          duration: 1.5,
                          ease: [0.16, 1, 0.3, 1],
                          delay: currentItemColIndex * 0.15 + (i % 2) * 0.05,
                        }}
                      >
                        <img
                          src={proj.thumbnail_url}
                          alt={proj.title}
                          className={`w-full ${aspectClass} block object-cover object-top transition-transform duration-500 group-hover:scale-105`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="font-['Noto_Sans_KR'] px-[20px] pb-[20px]">
                            <span className="text-[11px] md:text-[14px] font-bold text-white">
                              {proj.title}
                            </span>
                          </div>
                        </div>
                        <div className="absolute inset-0 rounded-[18px] border-[2px] border-transparent group-hover:border-white/20 transition-colors duration-300" />
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* 상세 페이지 */}
      <div
        className={`fixed top-0 left-0 w-full h-[100dvh] bg-transparent z-[1000] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDetailActive ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          ref={detailRef}
          className="absolute inset-0 w-full h-full bg-[#111111] overflow-y-auto overflow-x-hidden"
        >
          {selectedProject && (
            <div className="flex flex-col w-full bg-[#111111] min-h-screen">
              {(selectedProject as any).detail_html ? (
                <HtmlDetail html={(selectedProject as any).detail_html as string} />
              ) : selectedProject.detail_images && selectedProject.detail_images.length > 0 ? (
                 <div className="w-full flex justify-center">
                 <div className="flex flex-col items-center w-full gap-[0px] pt-[0px] pb-[100px]">
                    {selectedProject.detail_images.map((imgUrl, idx) => (
                      <div key={idx} className="w-full">
                        <img
                          className="w-full h-auto rounded-[8px] object-cover shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                          src={imgUrl}
                          alt={`${selectedProject.title} ${idx + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center pt-[150px] pb-[100px] px-[40px] text-center gap-[16px]">
                  <img src={selectedProject.thumbnail_url} alt={selectedProject.title} className="w-full max-w-[900px] rounded-[8px]" />
                  <h2 className="text-[32px] font-[800] text-white mt-[40px]">{selectedProject.title}</h2>
                  <p className="text-[16px] text-[rgba(255,255,255,0.6)]">{selectedProject.description}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleCloseDetail}
          className="absolute top-[30px] right-[30px] w-[50px] h-[50px] bg-black z-[1010] flex items-center justify-center rounded-[10px] hover:border hover:border-gray-500 transition-all duration-200"
        >
          <div className="w-[16px] h-[16px] border-b-2 border-r-2 border-white rotate-45 -translate-y-[3px]" />
        </button>
      </div>
    </>
  );
}
