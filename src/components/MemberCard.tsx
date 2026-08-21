import { MoreVertical } from "lucide-react";
import type { TeamMember } from "../data/members";

type MemberCardProps = {
  member: TeamMember;
};

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="border-b border-white/10 px-4 py-5">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4338a8] text-sm font-semibold">
          {member.initials}
        </div>

        {/* Member information */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="truncate text-sm font-semibold">
              {member.name} ({member.city})
            </h3>

            <button className="text-gray-400 transition hover:text-white">
              <MoreVertical size={18} />
            </button>
          </div>

          <p className="mt-1 text-xs text-gray-400">
            {member.timezone}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {member.workingHours}
          </p>

          {/* Status */}
          <div className="mt-3">
            <span
              className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${
                member.status === "Works Now"
                  ? "bg-green-500/15 text-green-400"
                  : member.status === "Working"
                    ? "bg-yellow-500/15 text-yellow-400"
                    : "bg-purple-500/15 text-purple-400"
              }`}
            >
              {member.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}