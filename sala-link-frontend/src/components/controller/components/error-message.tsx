import { cn } from "@/services/utils/cn";
import { useEffect, useRef, useState } from "react";

const MARQUEE_SPEED_PX_PER_S = 30;
const MARQUEE_PAUSE_MS = 1000;

export const ErrorMessage = ({ message }: { message?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [overflowPx, setOverflowPx] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const check = () => {
      const overflow = text.scrollWidth - container.clientWidth;
      setOverflowPx(overflow > 0 ? overflow : 0);
    };
    check();

    const observer = new ResizeObserver(check);
    observer.observe(container);
    observer.observe(text);
    return () => observer.disconnect();
  }, [message]);

  useEffect(() => {
    const text = textRef.current;
    if (!text || overflowPx <= 0) return;

    let cancelled = false;
    const duration = (overflowPx / MARQUEE_SPEED_PX_PER_S) * 1000;
    const pause = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const run = async () => {
      await pause(MARQUEE_PAUSE_MS);
      if (cancelled) return;

      while (!cancelled) {
        const fwd = text.animate(
          [{ transform: "translateX(0)" }, { transform: `translateX(-${overflowPx}px)` }],
          { duration, easing: "linear", fill: "forwards" }
        );
        await fwd.finished;
        if (cancelled) break;

        await pause(MARQUEE_PAUSE_MS);
        if (cancelled) break;

        const bwd = text.animate(
          [{ transform: `translateX(-${overflowPx}px)` }, { transform: "translateX(0)" }],
          { duration, easing: "linear", fill: "forwards" }
        );
        await bwd.finished;
        if (cancelled) break;

        await pause(MARQUEE_PAUSE_MS);
      }
    };

    run();
    return () => { cancelled = true; text.getAnimations().forEach(a => a.cancel()); };
  }, [overflowPx]);

  return (
    <div ref={containerRef} className="whitespace-nowrap overflow-x-hidden">
      <p
        ref={textRef}
        className={cn(
          "text-[0.65rem] font-medium text-red-500 break-words h-5  pl-2",
          overflowPx > 0 && "inline-block whitespace-nowrap"
        )}
      >
        {message}
      </p>
    </div>
  );
};