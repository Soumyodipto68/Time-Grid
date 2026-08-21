"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

type LocalTimeCardProps = {
  city: string;
  timezone: string;
  country: string;
};

export default function LocalTimeCard({
  city,
  timezone,
  country,
}: LocalTimeCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(currentTime);

  const date = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(currentTime);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111824] p-5 transition hover:border-purple-500/30">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-base font-semibold">
            {country} {city}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {timezone}
          </p>
        </div>

        <Clock
          size={18}
          className="text-gray-500"
        />
      </div>

      {/* Time */}
      <div className="mt-6">
        <p className="text-3xl font-bold tracking-tight">
          {time}
        </p>

        <p className="mt-1 text-sm text-gray-400">
          {date}
        </p>
      </div>
    </div>
  );
}