"use client";

import { CalendarClock,CheckCircle2, XCircle,} from "lucide-react";
import { useMemo } from "react";

import { timezoneLocations } from "../data/timezones";

import {calculateUTCOverlap,findMeetingSlots,} from "../lib/meeting";

import { formatUTCDate } from "../lib/timezone";

import { useMeeting } from "../context/MeetingContext";

import MeetingDuration from "./MeetingDuration";

export default function BestMeetingTime() {
  const {duration,setDuration,selectedMeeting,clearMeeting,} = useMeeting();

  const overlap = useMemo(() => {
    return calculateUTCOverlap(
      timezoneLocations
    );
  }, []);

  const slots = useMemo(() => {
    return findMeetingSlots(
      overlap,
      duration
    );
  }, [overlap, duration]);

  const bestSlot = slots[0];

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
            Find the best time for everyone.
          </p>
        </div>
      </div>

      {/* Duration */}
      <MeetingDuration
        duration={duration}
        onChange={setDuration}
      />

      {/* Selected meeting */}
      {selectedMeeting && (
        <div className="mt-6 rounded-xl border border-green-500/20 bg-green-500/10 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={18}
                className="text-green-400"
              />

              <span className="text-sm font-medium text-green-400">
                Selected Meeting
              </span>
            </div>

            <button
              onClick={clearMeeting}
              className="text-xs text-gray-500 transition hover:text-white"
            >
              Clear
            </button>
          </div>

          <p className="mt-3 text-3xl font-bold">
            {formatUTCDate(
              selectedMeeting.startUTC,
              "Asia/Kolkata"
            )}
            {" – "}
            {formatUTCDate(
              selectedMeeting.endUTC,
              "Asia/Kolkata"
            )}
          </p>

          <p className="mt-2 text-sm text-gray-400">
            {duration} minutes • Selected from timeline
          </p>
        </div>
      )}

      {/* No overlap */}
      {!overlap && (
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
            There is currently no time when
            everyone is working.
          </p>
        </div>
      )}

      {/* No meeting slot */}
      {overlap && !bestSlot && (
        <div className="mt-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <p className="font-medium text-yellow-400">
            No {duration}-minute slot available
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Try choosing a shorter meeting duration.
          </p>
        </div>
      )}

      {/* Recommended slot */}
      {bestSlot && !selectedMeeting && (
        <>
          <div className="mt-6 rounded-xl border border-purple-500/20 bg-purple-500/10 p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={18}
                className="text-green-400"
              />

              <span className="text-sm font-medium text-green-400">
                Recommended Slot
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold">
              {formatUTCDate(
                bestSlot.startUTC,
                "Asia/Kolkata"
              )}
              {" – "}
              {formatUTCDate(
                bestSlot.endUTC,
                "Asia/Kolkata"
              )}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              {duration} minutes • Everyone is available
            </p>
          </div>

          {/* Other slots */}
          {slots.length > 1 && (
            <div className="mt-5">
              <p className="mb-3 text-sm font-medium text-gray-300">
                Other available slots
              </p>

              <div className="space-y-2">
                {slots.slice(1, 5).map(
                  (slot) => (
                    <div
                      key={slot.startUTC.toISOString()}
                      className="flex items-center justify-between rounded-lg bg-[#0b101a] px-4 py-3"
                    >
                      <span className="text-sm text-gray-300">
                        {formatUTCDate(
                          slot.startUTC,
                          "Asia/Kolkata"
                        )}
                        {" – "}
                        {formatUTCDate(
                          slot.endUTC,
                          "Asia/Kolkata"
                        )}
                      </span>

                      <span className="text-xs text-gray-500">
                        {duration} min
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}