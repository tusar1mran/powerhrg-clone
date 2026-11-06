"use client";

import { useEffect } from "react";
import LayoutSwitcher from "./LayoutSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

export default function DesignDock() {
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => document.documentElement.removeAttribute("data-layout-pending"));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-[90] flex items-end gap-2 sm:right-6 sm:bottom-6">
      <LayoutSwitcher />
      <ThemeSwitcher />
    </div>
  );
}
