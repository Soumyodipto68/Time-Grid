import {CalendarClock,CheckCircle2,XCircle,} from "lucide-react";

import { timezoneLocations } from "../data/timezones";
import { calculateUTCOverlap } from "../lib/meeting";
import { formatUTCDate } from "../lib/timezone";

export default function BestMeetingTime() {
  const overlap = calculateUTCOverlap(
    timezoneLocations
  );

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-[#111824] p-6">
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
            Based on everyone working hours.
          </p>
        </div>
      </div>

      {!overlap ? (
        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="flex items-center gap-2">
            <XCircle
              size={18}
              className="text-red-400"
            />

            <span className="font-medium text-red-400">
              No common working hours
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-400">
            There is currently no time when everyone
            is working at the same time.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          {/* Recommended Slot */}
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-5">
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
              {formatUTCDate(
                overlap.startUTC,
                "Asia/Kolkata"
              )}
              {" – "}
              {formatUTCDate(
                overlap.endUTC,
                "Asia/Kolkata"
              )}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              {overlap.duration.toFixed(1)} hours of
              overlapping availability
            </p>
          </div>

          {/* Member Times */}
          <div className="mt-4 space-y-2">
            {overlap.members.map((member) => (
              <div
                key={member.city}
                className="flex items-center justify-between rounded-lg bg-[#0b101a] px-4 py-3"
              >
                <span className="text-sm">
                  {member.city}
                </span>

                <span className="text-sm text-gray-400">
                  {formatUTCDate(
                    overlap.startUTC,
                    member.timezone
                  )}
                  {" – "}
                  {formatUTCDate(
                    overlap.endUTC,
                    member.timezone
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}