"use client";

import { Clock3 } from "lucide-react";

import { timezoneLocations } from "../data/timezones";
import { calculateUTCOverlap } from "../lib/meeting";
import { useMeeting } from "../context/MeetingContext";

import TimelineHeader from "./TimelineHeader";
import TimelineRow from "./TimelineRow";

export default function WorkingHoursTimeline() {
  const { duration, selectMeeting,} = useMeeting();

  const date = new Date();

  const overlap = calculateUTCOverlap(
    timezoneLocations,
    date
  );

  function handleTimelineClick(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (!overlap) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const clickPosition =
      (event.clientX - rect.left) / rect.width;

    const totalMinutes =
      clickPosition * 24 * 60;

    // Round to nearest 30 minutes
    const roundedMinutes =
      Math.round(totalMinutes / 30) * 30;

    const startUTC = new Date(date);

    startUTC.setUTCHours(
      Math.floor(roundedMinutes / 60),
      roundedMinutes % 60,
      0,
      0
    );

    const endUTC = new Date(
      startUTC.getTime() +
        duration * 60 * 1000
    );

    // Don't allow selecting outside common availability
    if (
      startUTC < overlap.startUTC ||
      endUTC > overlap.endUTC
    ) {
      return;
    }

    selectMeeting(
      startUTC,
      endUTC
    );
  }

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
            Working hours normalized to UTC.
          </p>
        </div>

        <div className="rounded-lg bg-purple-500/10 px-3 py-2 text-xs text-purple-300">
          UTC
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-8">
        <TimelineHeader />

        <div className="mt-4 space-y-3">
          {timezoneLocations.map(
            (location) => (
              <TimelineRow
                key={location.id}
                city={location.city}
                country={location.country}
                timezone={location.timezone}
                startHour={location.startHour}
                endHour={location.endHour}
                date={date}
              />
            )
          )}
        </div>

        {/* Common availability */}
        {overlap && (
          <div className="mt-5">
            <div className="mb-2 ml-32 flex items-center gap-2 text-xs font-medium text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400" />

              Common availability
            </div>

            <div
              className="relative ml-32 h-4 cursor-pointer rounded-full bg-[#0b101a]"
              onClick={handleTimelineClick}
            >
              <div
                className="absolute h-full rounded-full bg-green-400 transition hover:bg-green-300"
                style={{
                  left: `${
                    (
                      (
                        overlap.startUTC.getUTCHours() +
                        overlap.startUTC.getUTCMinutes() /
                          60
                      ) /
                      24
                    ) *
                    100
                  }%`,

                  width: `${
                    (
                      (
                        overlap.endUTC.getTime() -
                        overlap.startUTC.getTime()
                      ) /
                      (1000 * 60 * 60)
                    ) /
                    24 *
                    100
                  }%`,
                }}
              />
            </div>

            <p className="mt-2 ml-32 text-xs text-gray-500">
              Click the green area to select a meeting time.
            </p>
          </div>
        )}

        {!overlap && (
          <div className="mt-5 ml-32 text-sm text-gray-500">
            No common working hours available.
          </div>
        )}
      </div>
    </section>
  );
}