"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ProjectColor } from "@/data/projects";
import { SWEEP_ANIMATION_MS, SWEEP_NAVIGATE_MS } from "@/lib/motion";

type ColorSweepContextValue = {
  triggerSweep: (color: ProjectColor, x: number, y: number) => Promise<void>;
};

const ColorSweepContext = createContext<ColorSweepContextValue | null>(null);

type ActiveSweep = {
  id: number;
  color: ProjectColor;
  x: number;
  y: number;
};

export function ColorSweepProvider({ children }: { children: ReactNode }) {
  const [activeSweep, setActiveSweep] = useState<ActiveSweep | null>(null);
  const sweepId = useRef(0);

  const triggerSweep = useCallback(
    (color: ProjectColor, x: number, y: number) => {
      return new Promise<void>((resolve) => {
        const id = ++sweepId.current;
        setActiveSweep({ id, color, x, y });

        window.setTimeout(() => resolve(), SWEEP_NAVIGATE_MS);

        window.setTimeout(() => {
          setActiveSweep((current) => (current?.id === id ? null : current));
        }, SWEEP_ANIMATION_MS);
      });
    },
    [],
  );

  return (
    <ColorSweepContext.Provider value={{ triggerSweep }}>
      {children}
      {activeSweep && (
        <div className="color-sweep-overlay" aria-hidden key={activeSweep.id}>
          <div
            className={`color-sweep-circle sweep-${activeSweep.color}`}
            style={{
              left: activeSweep.x,
              top: activeSweep.y,
            }}
          />
        </div>
      )}
    </ColorSweepContext.Provider>
  );
}

export function useColorSweep() {
  const context = useContext(ColorSweepContext);
  if (!context) {
    throw new Error("useColorSweep must be used within ColorSweepProvider");
  }
  return context;
}
