"use client";

import { useTheme } from "next-themes";
import { Sun } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { Theme } from "@/types";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return <div className="flex justify-center h-20"></div>;

  function toggleTheme() {
    const currentTheme: Theme = theme === "dark" ? "dark" : "light";
    const newTheme: Theme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  return (
    <div className="flex justify-center h-20 bg-transparent">
      <button onClick={toggleTheme} className="duration-200">
        <Sun className="h-10 w-10 hover:scale-105 duration-300" />
      </button>
    </div>
  );
};
