"use client";

import {
  Bookmark,
  Link,
  LogOut,
  Settings,
  Trash2,
  User,
  X,
} from "lucide-react";

import { signOut, useSession } from "next-auth/react";

import { useState } from "react";

import { useTeam } from "@/context/TeamContext";

export default function Header() {
  const { saveSchedule, deleteSchedule, savedScheduleId, savedScheduleName } = useTeam();

  const { data: session } = useSession();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const [scheduleName, setScheduleName] = useState("");

  const [saving, setSaving] = useState(false);

  const [copied, setCopied] = useState(false);

  const userName = session?.user?.name || "User";

  const userEmail = session?.user?.email || "";

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

const handleSaveClick = () => {
  setScheduleName(savedScheduleName ?? "");
  setSaveModalOpen(true);
};

  const handleSave = async () => {
    const trimmedName = scheduleName.trim();

    if (!trimmedName) {
      return;
    }

    try {
      setSaving(true);

      await saveSchedule(trimmedName);

      setSaveModalOpen(false);
      setScheduleName("");
    } catch (error) {
      console.error("Failed to save schedule:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSettingsOpen(false);

    await deleteSchedule();
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <>
      <header className="flex items-start justify-between border-b border-white/10 pb-6">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Good evening, {userName}! 👋
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
            disabled={!savedScheduleId}
            className="flex items-center gap-2 rounded-lg border border-purple-500/70 px-5 py-3 text-sm font-medium text-purple-400 transition hover:bg-purple-500/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Link size={17} />

            {copied ? "Copied!" : "Share This Schedule"}
          </button>

          {/* Save */}
          <button
            onClick={handleSaveClick}
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

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen((open) => !open)}
              className="flex h-12 items-center gap-3 rounded-lg border border-white/10 px-3 transition hover:bg-white/5"
              title="Account"
            >
              {/* Avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
                <User size={17} />
              </div>

              {/* Name */}
              <div className="hidden text-left lg:block">
                <p className="max-w-32 truncate text-sm font-medium text-white">
                  {userName}
                </p>

                <p className="max-w-32 truncate text-xs text-gray-500">
                  {userEmail}
                </p>
              </div>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-xl border border-white/10 bg-[#111827] shadow-2xl">
                {/* User info */}
                <div className="border-b border-white/10 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
                      <User size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {userName}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-300 transition hover:bg-red-500/10 hover:text-red-400"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Save Schedule Modal */}
      {saveModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSaveModalOpen(false);
            }
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111824] p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                    <Bookmark size={20} className="text-purple-400" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {savedScheduleId ? "Update Schedule" : "Save Schedule"}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      Give your schedule a name.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSaveModalOpen(false)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            {/* Input */}
            <div className="mt-6">
              <label
                htmlFor="schedule-name"
                className="mb-2 block text-xs font-medium text-gray-400"
              >
                Schedule name
              </label>

              <input
                id="schedule-name"
                type="text"
                value={scheduleName}
                onChange={(event) => setScheduleName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSave();
                  }
                }}
                placeholder="e.g. Engineering Team"
                autoFocus
                maxLength={100}
                className="w-full rounded-xl border border-white/10 bg-[#0b101a] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/60"
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSaveModalOpen(false)}
                disabled={saving}
                className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving || !scheduleName.trim()}
                className="flex min-w-24 items-center justify-center gap-2 rounded-lg bg-purple-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {saving ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving...
                  </>
                ) : savedScheduleId ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
