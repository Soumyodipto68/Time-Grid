import { CalendarClock, CheckCircle2 } from "lucide-react";
import { findOverlap } from "../lib/meeting";

const workingHours = [
  {
    city: "Kolkata",
    start: 10,
    end: 19,
  },
  {
    city: "New York",
    start: 9,
    end: 17,
  },
  {
    city: "London",
    start: 9,
    end: 17,
  },
  {
    city: "Tokyo",
    start: 10,
    end: 19,
  },
];

function formatHour(hour: number) {
  const normalizedHour = hour % 24;
  const suffix = normalizedHour >= 12 ? "PM" : "AM";

  let displayHour = normalizedHour % 12;

  if (displayHour === 0) {
    displayHour = 12;
  }

  return `${displayHour}:00 ${suffix}`;
}

export default function BestMeetingTime() {
  const overlap = findOverlap(workingHours);

  if (!overlap) {
    return (
      <section className="mt-8 rounded-2xl border border-red-500/20 bg-[#111824] p-6">
        <div className="flex items-center gap-3">
          <CalendarClock
            size={20}
            className="text-red-400"
          />

          <h2 className="text-lg font-semibold">
            Best Meeting Time
          </h2>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          There is no common working-hour overlap for everyone.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-purple-500/20 bg-[#111824] p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CalendarClock
          size={20}
          className="text-purple-400"
        />

        <div>
          <h2 className="text-lg font-semibold">
            Best Meeting Time
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            The time when everyone is available.
          </p>
        </div>
      </div>

      {/* Recommended time */}
      <div className="mt-6 rounded-xl border border-purple-500/20 bg-purple-500/10 p-5">
        <div className="flex items-center gap-2">
          <CheckCircle2
            size={18}
            className="text-green-400"
          />

          <span className="text-sm font-medium text-green-400">
            Everyone is available
          </span>
        </div>

        <p className="mt-3 text-3xl font-bold">
          {formatHour(overlap.start)}
          {" – "}
          {formatHour(overlap.end)}
        </p>

        <p className="mt-2 text-sm text-gray-400">
          {overlap.duration} hours of overlapping availability
        </p>
      </div>
    </section>
  );
}