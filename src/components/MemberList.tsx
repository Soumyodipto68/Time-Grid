import { members } from "../data/members";
import MemberCard from "./MemberCard";

export default function MemberList() {
  return (
    <div className="mt-8">
      {/* Heading */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-200">
          Team Members
        </h2>

        <span className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-white/10 px-2 text-xs font-semibold text-gray-300">
          {members.length}
        </span>
      </div>

      {/* Members */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111824]">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}