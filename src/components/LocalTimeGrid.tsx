import LocalTimeCard from "./LocalTimeCard";

const locations = [
  {
    city: "Kolkata",
    timezone: "Asia/Kolkata",
    country: "🇮🇳",
  },
  {
    city: "New York",
    timezone: "America/New_York",
    country: "🇺🇸",
  },
  {
    city: "London",
    timezone: "Europe/London",
    country: "🇬🇧",
  },
  {
    city: "Tokyo",
    timezone: "Asia/Tokyo",
    country: "🇯🇵",
  },
];

export default function LocalTimeGrid() {
  return (
    <section className="mt-8">
      {/* Section Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Current Local Time
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            See the current time for everyone on your team.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Live
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {locations.map((location) => (
          <LocalTimeCard
            key={location.timezone}
            city={location.city}
            timezone={location.timezone}
            country={location.country}
          />
        ))}
      </div>
    </section>
  );
}