import type { TeamMember } from "../context/TeamContext";

export function encodeTeam(members: TeamMember[]) {
  const data = members.map((member) => ({
    id: member.id,
    name: member.name,
    city: member.city,
    country: member.country,
    timezone: member.timezone,
    startHour: member.startHour,
    endHour: member.endHour,
  }));

  return encodeURIComponent(
    JSON.stringify(data)
  );
}

export function decodeTeam( value: string): TeamMember[] | null {
  try {
    const decoded = JSON.parse(
      decodeURIComponent(value)
    );

    if (!Array.isArray(decoded)) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}