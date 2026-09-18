"use client";

import * as React from "react";
import { applyTheme, type Theme } from "@/hooks/useTheme";

/**
 * Prevents flash of wrong theme: run before paint via inline script in layout,
 * and keep data-theme in sync on client navigations.
 *
 * Brand default = light (https://www.drafteados.com/).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const stored = localStorage.getItem("drafteados-theme");
    const theme: Theme =
      stored === "dark" || stored === "light" ? stored : "light";
    applyTheme(theme);
  }, []);

  return <>{children}</>;
}

/**
 * Inline script for root layout <head> — avoids FOUC.
 * Paste as: <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
 */
export const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('drafteados-theme');
    if (t !== 'light' && t !== 'dark') t = 'light';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;
