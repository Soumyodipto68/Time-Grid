"use client";

import { useEffect, useState } from "react";
import { Bookmark, Loader2, Trash2, X } from "lucide-react";

import { useTeam, type TeamMember } from "@/context/TeamContext";

type SavedSchedule = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  members: TeamMember[];
};

type SavedSchedulesProps = {
  onClose: () => void;
};

export default function SavedSchedules({ onClose }: SavedSchedulesProps) {
  const { loadSchedule } = useTeam();

  const [schedules, setSchedules] = useState<SavedSchedule[]>([]);

  const [loading, setLoading] = useState(true);

  const [openingId, setOpeningId] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadSchedules() {
      try {
        const response = await fetch("/api/schedules");

        if (!response.ok) {
          throw new Error("Failed to load schedules");
        }

        const data = await response.json();

        setSchedules(data);
      } catch (error) {
        console.error("Failed to load schedules:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSchedules();
  }, []);

  async function handleOpen(schedule: SavedSchedule) {
    setOpeningId(schedule.id);

    try {
      const response = await fetch(`/api/schedules/${schedule.id}`);

      if (!response.ok) {
        throw new Error("Failed to load schedule");
      }

      const data = await response.json();

      const members: TeamMember[] = data.members.map((member: TeamMember) => ({
        id: member.id,
        name: member.name,
        city: member.city,
        country: member.country,
        timezone: member.timezone,
        startHour: member.startHour,
        endHour: member.endHour,
      }));

      loadSchedule(schedule.id, members, data.name);

      onClose();
    } catch (error) {
      console.error("Failed to open schedule:", error);
    } finally {
      setOpeningId(null);
    }
  }

  async function handleDelete(scheduleId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this schedule?",
    );

    if (!confirmed) return;

    setDeletingId(scheduleId);

    try {
      const response = await fetch(`/api/schedules/${scheduleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete schedule");
      }

      setSchedules((current) =>
        current.filter((schedule) => schedule.id !== scheduleId),
      );
    } catch (error) {
      console.error("Failed to delete schedule:", error);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111824] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
              <Bookmark size={20} className="text-purple-400" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Saved Schedules</h2>

              <p className="text-xs text-gray-500">
                Open and manage your saved schedules.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
            aria-label="Close saved schedules"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={24} className="animate-spin text-purple-400" />
            </div>
          )}

          {!loading && schedules.length === 0 && (
            <div className="py-12 text-center">
              <Bookmark size={32} className="mx-auto text-gray-600" />

              <p className="mt-4 text-sm font-medium text-gray-300">
                No saved schedules
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Save a schedule from the bookmark button to see it here.
              </p>
            </div>
          )}

          {!loading && schedules.length > 0 && (
            <div className="space-y-3">
              {schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="rounded-xl border border-white/10 bg-[#0b101a] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-white">
                        {schedule.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {schedule.members.length}{" "}
                        {schedule.members.length === 1 ? "member" : "members"}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(schedule.id)}
                      disabled={deletingId === schedule.id}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Delete ${schedule.name}`}
                    >
                      {deletingId === schedule.id ? (
                        <Loader2 size={17} className="animate-spin" />
                      ) : (
                        <Trash2 size={17} />
                      )}
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs text-gray-600">
                      Updated{" "}
                      {new Date(schedule.updatedAt).toLocaleDateString()}
                    </p>

                    <button
                      onClick={() => handleOpen(schedule)}
                      disabled={openingId === schedule.id}
                      className="rounded-lg bg-purple-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {openingId === schedule.id ? (
                        <span className="flex items-center gap-2">
                          <Loader2 size={14} className="animate-spin" />
                          Opening...
                        </span>
                      ) : (
                        "Open"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
