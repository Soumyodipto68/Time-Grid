"use client";

import { Trash2 } from "lucide-react";

import { useTeam } from "../context/TeamContext";

export default function MemberList() {
  const { members, removeMember } = useTeam();

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Team Members
        </h2>

        <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-gray-500">
          {members.length}
        </span>
      </div>

      <div className="space-y-2">
        {members.map((member) => (
          <div
            key={member.id}
            className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-3 transition hover:border-white/10 hover:bg-white/5"
          >
            {/* Member information */}
            <div className="flex min-w-0 items-center gap-3">
              {/* Country */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-lg">
                {member.country}
              </div>

              {/* Name + City */}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-200">
                  {member.name}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {member.city}
                </p>
              </div>
            </div>

            {/* Remove button */}
            <button
              type="button"
              onClick={() =>
                removeMember(member.id)
              }
              className="rounded-lg p-2 text-gray-600 opacity-0 transition hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
              title={`Remove ${member.name}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {members.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/10 p-5 text-center">
          <p className="text-sm text-gray-500">
            No team members yet.
          </p>

          <p className="mt-1 text-xs text-gray-600">
            Add someone to start scheduling.
          </p>
        </div>
      )}
    </div>
  );
}