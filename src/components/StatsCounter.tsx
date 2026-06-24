import React, { useState, useEffect, useRef } from 'react';

interface StatsCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({
  target,
  suffix = '',
  prefix = '',
  duration = 1500
}) => {
  const [count, setCount] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = target;
    const range = end - start;
    if (range === 0) return;

    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime >= duration) {
        setCount(end);
      } else {
        const progress = elapsedTime / duration;
        // Ease out quad
        const easeProgress = progress * (2 - progress);
        setCount(Math.floor(start + range * easeProgress));
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [hasStarted, target, duration]);

  return (
    <div ref={elementRef} style={styles.counter}>
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </div>
  );
};

const styles = {
  counter: {
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(2rem, 5vw, 4rem)",
    fontWeight: 700,
    color: "var(--text-primary)",
    letterSpacing: "-0.04em",
    lineHeight: 1.1,
    margin: "0 0 0.5rem 0",
    fontVariantNumeric: "tabular-nums" as const,
    transform: "translate3d(0, 0, 0)",
    backfaceVisibility: "hidden" as const,
    willChange: "transform",
    whiteSpace: "nowrap" as const,
  }
};
