import { notFound } from "next/navigation";

type TeamMember = {
  id: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
  startHour: number;
  endHour: number;
};

type Schedule = {
  id: string;
  name: string;
  members: TeamMember[];
};

async function getSchedule(
  id: string
): Promise<Schedule | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/schedules/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function SharedSchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const schedule = await getSchedule(id);

  if (!schedule) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#070b12] px-8 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-medium text-purple-400">
            TIME-ZONE SYNCHRONIZER
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {schedule.name}
          </h1>

          <p className="mt-2 text-gray-400">
            Shared team schedule
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {schedule.members.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-white/10 bg-[#0b101a] p-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {member.country}
                </span>

                <div>
                  <h2 className="font-semibold">
                    {member.name}
                  </h2>

                  <p className="text-sm text-gray-400">
                    {member.city}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  Time zone
                </p>

                <p className="mt-1 text-sm">
                  {member.timezone}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Working hours
                </p>

                <p className="mt-1 font-medium">
                  {member.startHour}:00 –{" "}
                  {member.endHour}:00
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}