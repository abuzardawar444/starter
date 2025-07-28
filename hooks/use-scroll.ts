import { useEffect, useState } from "react";

export function useSticky(threshold: number = 0) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldStick = window.scrollY > threshold;
      // Prevent unnecessary state updates
      setIsSticky((prev) => {
        if (prev !== shouldStick) return shouldStick;
        return prev;
      });
    };

    // Use rAF for smoother UI on high scroll events
    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return isSticky;
}
