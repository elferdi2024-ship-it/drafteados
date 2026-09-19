// filepath: src/components/time/TimezoneContext.tsx
"use client";

import * as React from "react";
import {
  type RegionId,
  type Region,
  getRegion,
  resolveRegionId,
  storeRegionId,
  STORAGE_KEY,
} from "@/lib/time/regions";

interface TimezoneContextValue {
  regionId: RegionId;
  region: Region;
  setRegionId: (id: RegionId) => void;
}

const TimezoneContext = React.createContext<TimezoneContextValue | null>(null);

/** Inline script that runs in <head> to prevent SSR/hydration flash */
export const timezoneInitScript = `
(function() {
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    if (!stored) {
      var match = document.cookie.match(new RegExp("(^|;\\\\s*)${STORAGE_KEY}=([^;]+)"));
      if (match && match[2]) stored = match[2];
    }
    if (stored) {
      document.documentElement.setAttribute("data-tz", stored);
    }
  } catch (e) {}
})();
`;

export function TimezoneProvider({ children }: { children: React.ReactNode }) {
  // Always initialize to "ES" so SSR and client initial hydration match 100%
  const [regionId, setRegionState] = React.useState<RegionId>("ES");

  // Sync on mount and listen to cross-tab & custom events
  React.useEffect(() => {
    const current = resolveRegionId();
    setRegionState(current);

    const onCustomChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as { regionId: RegionId };
      if (detail?.regionId && detail.regionId !== regionId) {
        setRegionState(detail.regionId);
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setRegionState(e.newValue as RegionId);
      }
    };

    window.addEventListener("drafteados:tz-change", onCustomChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("drafteados:tz-change", onCustomChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setRegionId = React.useCallback((id: RegionId) => {
    setRegionState(id);
    storeRegionId(id);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("drafteados:tz-change", { detail: { regionId: id } })
      );
    }
  }, []);

  const value = React.useMemo(
    () => ({
      regionId,
      region: getRegion(regionId),
      setRegionId,
    }),
    [regionId, setRegionId]
  );

  return (
    <TimezoneContext.Provider value={value}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone(): TimezoneContextValue {
  const ctx = React.useContext(TimezoneContext);
  if (!ctx) {
    // Graceful fallback if called outside provider
    const fallbackId = typeof window !== "undefined" ? resolveRegionId() : "ES";
    return {
      regionId: fallbackId,
      region: getRegion(fallbackId),
      setRegionId: (id: RegionId) => storeRegionId(id),
    };
  }
  return ctx;
}
