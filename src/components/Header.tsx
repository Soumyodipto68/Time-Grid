"use client";

import { Bookmark, Link, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTeam } from "@/context/TeamContext";

export default function Header() {
  const {
    saveSchedule,
    deleteSchedule,
    savedScheduleId,
  } = useTeam();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

const handleShare = async () => {
  if (!savedScheduleId) {
    return;
  }

  const shareUrl = `${window.location.origin}/schedule/${savedScheduleId}`;

  try {
    await navigator.clipboard.writeText(shareUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  } catch (error) {
    console.error("Failed to copy URL:", error);
  }
};

  const handleDelete = async () => {
    setSettingsOpen(false);
    await deleteSchedule();
  };

  return (
    <header className="flex items-start justify-between border-b border-white/10 pb-6">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Good evening, Soumyodipto! 👋
        </h1>

        <p className="mt-1 text-gray-400">
          Plan meetings effortlessly across time zones.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Share */}
      <button
        onClick={handleShare}
        className="flex items-center gap-2 rounded-lg border border-purple-500/70 px-5 py-3 text-sm font-medium text-purple-400 transition hover:bg-purple-500/10"
        >
      <Link size={17} />
      {copied ? "Copied!" : "Share This Schedule"}
      </button>

        {/* Save */}
        <button
          onClick={saveSchedule}
          className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:bg-white/5 hover:text-white"
          title="Save schedule"
        >
          <Bookmark size={19} />
        </button>

        {/* Settings */}
        <div className="relative">
          <button
            onClick={() => setSettingsOpen((open) => !open)}
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:bg-white/5 hover:text-white"
            title="Settings"
          >
            <Settings size={19} />
          </button>

          {settingsOpen && (
            <div className="absolute right-0 top-14 z-50 w-52 overflow-hidden rounded-xl border border-white/10 bg-[#111827] shadow-2xl">
              <button
                onClick={handleDelete}
                disabled={!savedScheduleId}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 size={17} />
                Delete Schedule
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}