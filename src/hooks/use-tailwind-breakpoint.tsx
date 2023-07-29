"use client";
// hooks/useTailwindBreakpoint.tsx

import { useState, useEffect } from "react";

export const useTailwindBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) {
        setBreakpoint("xl");
      } else if (window.matchMedia("(min-width: 1024px)").matches) {
        setBreakpoint("lg");
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setBreakpoint("md");
      } else if (window.matchMedia("(min-width: 640px)").matches) {
        setBreakpoint("sm");
      } else {
        setBreakpoint("xs");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
};
