"use client";

import { Bookmark, ChevronRight, Moon, Sun } from "lucide-react";
import { useState } from "react";

import { useTeam } from "@/context/TeamContext";
import SavedSchedules from "./SavedSchedules";

export default function SidebarSettings() {
  const { timeFormat, setTimeFormat } = useTeam();

  const [savedSchedulesOpen, setSavedSchedulesOpen] = useState(false);

  return (
    <>
      <div className="mt-6 space-y-4">
        {/* Saved Teams */}
        <button
          onClick={() => setSavedSchedulesOpen(true)}
          className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#111824] px-4 py-4 transition hover:bg-white/5"
        >
          <div className="flex items-center gap-3">
            <Bookmark size={20} className="text-gray-400" />

            <span className="text-sm font-medium">Saved Teams</span>
          </div>

          <ChevronRight size={18} className="text-gray-400" />
        </button>

        {/* Time Format */}
        <div className="rounded-xl border border-white/10 bg-[#111824] p-4">
          <p className="mb-3 text-xs text-gray-400">Time Format</p>

          <div className="flex rounded-lg bg-[#0b101a] p-1">
            <button
              onClick={() => setTimeFormat("12h")}
              className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition ${
                timeFormat === "12h"
                  ? "bg-[#252a3b] text-[#a78bfa]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              12 Hour
            </button>

            <button
              onClick={() => setTimeFormat("24h")}
              className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition ${
                timeFormat === "24h"
                  ? "bg-[#252a3b] text-[#a78bfa]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              24 Hour
            </button>
          </div>
        </div>

        {/* Theme */}
        <div className="rounded-xl border border-white/10 bg-[#111824] p-4">
          <p className="mb-3 text-xs text-gray-400">Theme</p>

          <div className="flex gap-2">
            {/* Light */}
            <button className="flex h-10 w-14 items-center justify-center rounded-lg border border-white/10 bg-[#181d27] text-yellow-400 transition hover:bg-white/10">
              <Sun size={18} />
            </button>

            {/* Dark */}
            <button className="flex h-10 w-14 items-center justify-center rounded-lg bg-[#3020a8] text-purple-300">
              <Moon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Saved Schedules Modal */}
      {savedSchedulesOpen && (
        <SavedSchedules onClose={() => setSavedSchedulesOpen(false)} />
      )}
    </>
  );
}
