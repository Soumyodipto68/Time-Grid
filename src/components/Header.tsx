"use client";

import {Bookmark,Check,Link,Settings,} from "lucide-react";
import { useState } from "react";

import { useTeam } from "../context/TeamContext";
import { encodeTeam } from "../lib/teamUrl";

export default function Header() {

  const { members } = useTeam();
  
  const [copied, setCopied] = useState(false);
  
  const { saveSchedule } = useTeam();

  async function handleShare() {
    const encodedTeam = encodeTeam(members);

    const url =`${window.location.origin}` + `/?team=${encodedTeam}`;

    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => { setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  }

  return (
    <header className="flex items-start justify-between border-b border-white/10 pb-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Good evening, Soumyodipto! 👋
        </h1>

        <p className="mt-1 text-gray-400">
          Plan meetings effortlessly across time zones.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Share */}
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-2 rounded-lg border border-purple-500/70 px-5 py-3 text-sm font-medium text-purple-400 transition hover:bg-purple-500/10"
        >
          {copied ? (
            <Check size={17} />
          ) : (
            <Link size={17} />
          )}

          {copied
            ? "Copied!"
            : "Share This Schedule"}
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
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:bg-white/5 hover:text-white"
          aria-label="Settings"
        >
          <Settings size={19} />
        </button>
      </div>
    </header>
  );
}