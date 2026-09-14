"use client";

import { useTeam } from "../context/TeamContext";

export default function TimelineHeader() {
  const { timeFormat } = useTeam();

  const hours =
    timeFormat === "12h"
      ? ["12 AM", "6 AM", "12 PM", "6 PM", "12 AM"]
      : ["00:00", "06:00", "12:00", "18:00", "24:00"];

  return (
    <div className="ml-32 flex justify-between text-xs text-gray-500">
      {hours.map((hour, index) => (
        <span key={`${hour}-${index}`}>
          {hour}
        </span>
      ))}
    </div>
  );
}