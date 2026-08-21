import { Clock3 } from "lucide-react";
import { timezoneLocations } from "../data/timezones";
import TimelineHeader from "./TimelineHeader";
import TimelineRow from "./TimelineRow";

export default function WorkingHoursTimeline() {
  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-[#111824] p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Clock3
              size={19}
              className="text-purple-400"
            />

            <h2 className="text-lg font-semibold">
              Working Hours
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            See when your team is available.
          </p>
        </div>

        <div className="rounded-lg bg-purple-500/10 px-3 py-2 text-xs text-purple-300">
          24 Hour View
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-8">
        <TimelineHeader />

        <div className="mt-4 space-y-3">
          {timezoneLocations.map((location) => (
            <TimelineRow
              key={location.id}
              city={location.city}
              country={location.country}
              startHour={location.startHour}
              endHour={location.endHour}
            />
          ))}
        </div>
      </div>
    </section>
  );
}