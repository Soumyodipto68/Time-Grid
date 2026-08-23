"use client";

import {Bookmark,Link,Settings,} from "lucide-react";

export default function Header() {
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
        <button className="flex items-center gap-2 rounded-lg border border-purple-500/70 px-5 py-3 text-sm font-medium text-purple-400 transition hover:bg-purple-500/10">
          <Link size={17} />

          Share This Schedule
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:bg-white/5 hover:text-white">
          <Bookmark size={19} />
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:bg-white/5 hover:text-white">
          <Settings size={19} />
        </button>
      </div>
    </header>
  );
}