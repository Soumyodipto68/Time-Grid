"use client";

import { useEffect, useState } from "react";
import { UserPlus, X } from "lucide-react";

import {
  useTeam,
  type TeamMember,
} from "../context/TeamContext";

type AddMemberModalProps = {
  open: boolean;
  onClose: () => void;
  member?: TeamMember | null;
};

const timezones = [
  {
    city: "Kolkata",
    country: "🇮🇳",
    timezone: "Asia/Kolkata",
  },
  {
    city: "London",
    country: "🇬🇧",
    timezone: "Europe/London",
  },
  {
    city: "New York",
    country: "🇺🇸",
    timezone: "America/New_York",
  },
  {
    city: "Los Angeles",
    country: "🇺🇸",
    timezone: "America/Los_Angeles",
  },
  {
    city: "Tokyo",
    country: "🇯🇵",
    timezone: "Asia/Tokyo",
  },
  {
    city: "Singapore",
    country: "🇸🇬",
    timezone: "Asia/Singapore",
  },
  {
    city: "Dubai",
    country: "🇦🇪",
    timezone: "Asia/Dubai",
  },
  {
    city: "Sydney",
    country: "🇦🇺",
    timezone: "Australia/Sydney",
  },
];

export default function AddMemberModal({
  open,
  onClose,
  member = null,
}: AddMemberModalProps) {
  const {addMember,updateMember,} = useTeam();

  const isEditing = Boolean(member);

  const [name, setName] = useState("");

  const [selectedTimezone, setSelectedTimezone] =useState(timezones[0]);

  const [startHour, setStartHour] = useState(10);

  const [endHour, setEndHour] = useState(19);

  /*
   * Populate form when editing
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    if (member) {
      const timezone =
        timezones.find(
          (item) =>
            item.timezone ===
            member.timezone
        ) ?? timezones[0];

      setName(member.name);

      setSelectedTimezone(timezone);

      setStartHour(member.startHour);

      setEndHour(member.endHour);
    } else {
      resetForm();
    }
  }, [open, member]);

  function resetForm() {
    setName("");

    setSelectedTimezone(
      timezones[0]
    );

    setStartHour(10);

    setEndHour(19);
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    /*
     * EDIT
     */
    if (member) {
      updateMember(member.id, {
        name: name.trim(),

        city: selectedTimezone.city,

        country:
          selectedTimezone.country,

        timezone:
          selectedTimezone.timezone,

        startHour,

        endHour,
      });

      onClose();

      return;
    }

    /*
     * ADD
     */
    const newMember: TeamMember = {
      id: crypto.randomUUID(),

      name: name.trim(),

      city: selectedTimezone.city,

      country:
        selectedTimezone.country,

      timezone:
        selectedTimezone.timezone,

      startHour,

      endHour,
    };

    addMember(newMember);

    resetForm();

    onClose();
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111824] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
              <UserPlus
                size={18}
                className="text-purple-400"
              />
            </div>

            <div>
              <h2 className="font-semibold">
                {isEditing
                  ? "Edit Team Member"
                  : "Add Team Member"}
              </h2>

              <p className="text-xs text-gray-500">
                {isEditing
                  ? "Update member details"
                  : "Add someone to your team"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="e.g. Soumyodipto"
              className="w-full rounded-lg border border-white/10 bg-[#0b101a] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500/50"
            />
          </div>

          {/* Timezone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              City / Timezone
            </label>

            <select
              value={
                selectedTimezone.timezone
              }
              onChange={(event) => {
                const selected =
                  timezones.find(
                    (timezone) =>
                      timezone.timezone ===
                      event.target.value
                  );

                if (selected) {
                  setSelectedTimezone(
                    selected
                  );
                }
              }}
              className="w-full rounded-lg border border-white/10 bg-[#0b101a] px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50"
            >
              {timezones.map(
                (timezone) => (
                  <option
                    key={
                      timezone.timezone
                    }
                    value={
                      timezone.timezone
                    }
                    className="bg-[#111824]"
                  >
                    {timezone.country}{" "}
                    {timezone.city}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Working Hours */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Working Hours
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* Start */}
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Start
                </label>

                <select
                  value={startHour}
                  onChange={(event) =>
                    setStartHour(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0b101a] px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500/50"
                >
                  {Array.from(
                    { length: 13 },
                    (_, index) =>
                      index + 6
                  ).map((hour) => (
                    <option
                      key={hour}
                      value={hour}
                      className="bg-[#111824]"
                    >
                      {formatHour(hour)}
                    </option>
                  ))}
                </select>
              </div>

              {/* End */}
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  End
                </label>

                <select
                  value={endHour}
                  onChange={(event) =>
                    setEndHour(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#0b101a] px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500/50"
                >
                  {Array.from(
                    { length: 13 },
                    (_, index) =>
                      index + 12
                  ).map((hour) => (
                    <option
                      key={hour}
                      value={hour}
                      className="bg-[#111824]"
                    >
                      {formatHour(hour)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name.trim()}
              className="rounded-lg bg-purple-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isEditing
                ? "Save Changes"
                : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function formatHour(hour: number) {
  if (hour === 0) {
    return "12 AM";
  }

  if (hour === 12) {
    return "12 PM";
  }

  if (hour > 12) {
    return `${hour - 12} PM`;
  }

  return `${hour} AM`;
}