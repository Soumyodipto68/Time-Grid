"use client";

type MeetingDurationProps = {
  duration: number;
  onChange: (duration: number) => void;
};

const durations = [
  {
    label: "30 min",
    value: 30,
  },
  {
    label: "45 min",
    value: 45,
  },
  {
    label: "60 min",
    value: 60,
  },
  {
    label: "90 min",
    value: 90,
  },
];

export default function MeetingDuration({
  duration,
  onChange,
}: MeetingDurationProps) {
  return (
    <div className="mt-5">
      <p className="mb-3 text-sm font-medium text-gray-300">
        Meeting Duration
      </p>

      <div className="flex flex-wrap gap-2">
        {durations.map((item) => {
          const active = duration === item.value;

          return (
            <button
              key={item.value}
              onClick={() => onChange(item.value)}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                active
                  ? "border-purple-500 bg-purple-500/15 text-purple-300"
                  : "border-white/10 bg-[#0b101a] text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}