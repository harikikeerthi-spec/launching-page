import { useEffect, useState } from "react";

export const LAUNCH_AT = new Date("2026-08-19T11:09:00+05:30");

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setTime(diff(LAUNCH_AT));
    const id = setInterval(() => setTime(diff(LAUNCH_AT)), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: time?.days },
    { label: "Hours", value: time?.hours },
    { label: "Minutes", value: time?.minutes },
    { label: "Seconds", value: time?.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {units.map((u) => (
        <div
          key={u.label}
          className="rounded-2xl border border-border/70 bg-surface/80 px-3 py-4 text-center shadow-[var(--shadow-soft)] sm:px-6 sm:py-5"
        >
          <div
            className="text-3xl font-black tabular-nums sm:text-5xl"
            style={{
              backgroundImage: "var(--gradient-brand)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {u.value === undefined ? "--" : String(u.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[0.62rem] font-bold tracking-[0.22em] text-muted-foreground uppercase sm:text-xs">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}
