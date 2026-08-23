"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import {
  useTeam,
  type TeamMember,
} from "../context/TeamContext";

import AddMemberModal from "./AddMemberModal";

export default function MemberList() {
  const {
    members,
    removeMember,
  } = useTeam();

  const [editingMember, setEditingMember] =
    useState<TeamMember | null>(null);

  return (
    <>
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
              {/* Member */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-lg">
                  {member.country}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-200">
                    {member.name}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {member.city}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                {/* Edit */}
                <button
                  type="button"
                  onClick={() =>
                    setEditingMember(
                      member
                    )
                  }
                  className="rounded-lg p-2 text-gray-600 transition hover:bg-purple-500/10 hover:text-purple-400"
                  title={`Edit ${member.name}`}
                >
                  <Pencil size={14} />
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() =>
                    removeMember(
                      member.id
                    )
                  }
                  className="rounded-lg p-2 text-gray-600 transition hover:bg-red-500/10 hover:text-red-400"
                  title={`Remove ${member.name}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty */}
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

      {/* Edit Modal */}
      <AddMemberModal
        open={Boolean(editingMember)}
        member={editingMember}
        onClose={() =>
          setEditingMember(null)
        }
      />
    </>
  );
}