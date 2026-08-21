import { Globe, Menu } from "lucide-react";
import MemberList from "./MemberList";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-[340px] flex-col border-r border-white/10 bg-[#0b101a]">
      {/* Header */}
      <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-6">
        <div className="flex items-center gap-3">
          <Globe size={28} />

          <span className="text-lg font-semibold">
            Time-Zone Synchronizer
          </span>
        </div>

        <Menu
          size={22}
          className="text-gray-400"
        />
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Add Member */}
        <button className="w-full rounded-lg bg-[#4c2bd9] py-3 font-medium transition hover:bg-[#5a35ed]">
          + Add Member
        </button>

        {/* Team Members */}
        <MemberList />
      </div>
    </aside>
  );
}