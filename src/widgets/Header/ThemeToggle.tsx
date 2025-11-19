"use client";

import { Button } from "flowbite-react";
import { useThemeMode } from "flowbite-react";
import { HiMoon, HiSun } from "react-icons/hi";

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Button
      aria-label="Toggle dark mode"
      color="gray"
      size="sm"
      onClick={toggleMode}
      className="border-none bg-transparent p-0 focus:ring-0 hover:bg-transparent"
    >
      {mode === "dark" ? <HiMoon className="h-5 w-5" />  : <HiSun className="h-5 w-5" />}
    </Button>
  );
}
