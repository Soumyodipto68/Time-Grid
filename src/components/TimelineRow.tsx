import { getTimelinePosition } from "../lib/timeline";

type TimelineRowProps = {
  city: string;
  country: string;
  timezone: string;
  startHour: number;
  endHour: number;
  date: Date;
};

export default function TimelineRow({
  city,
  country,
  timezone,
  startHour,
  endHour,
  date,
}: TimelineRowProps) {
  const { start, end } = getTimelinePosition(
    date,
    {
      city,
      timezone,
      startHour,
      endHour,
    }
  );

  const startPosition = (start / 24) * 100;

  const width = ((end - start) / 24) * 100;

  return (
    <div className="flex items-center gap-4">
      {/* City */}
      <div className="flex w-28 shrink-0 items-center gap-2">
        <span className="text-lg">
          {country}
        </span>

        <span className="truncate text-sm font-medium">
          {city}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative h-12 flex-1 overflow-hidden rounded-lg bg-[#0b101a]">
        {/* Working hours */}
        <div
          className="absolute top-1/2 h-8 -translate-y-1/2 rounded-md bg-purple-500/70"
          style={{
            left: `${startPosition}%`,
            width: `${width}%`,
          }}
        />

        {/* Hour lines */}
        {[0, 6, 12, 18, 24].map(
          (hour) => (
            <div
              key={hour}
              className="absolute top-0 h-full border-l border-white/5"
              style={{
                left: `${(hour / 24) * 100}%`,
              }}
            />
          )
        )}
      </div>
    </div>
  );
}