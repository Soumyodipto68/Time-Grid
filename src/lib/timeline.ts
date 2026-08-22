import { getUTCWorkingHours } from "./timezone";

type TimelineMember = {
  city: string;
  timezone: string;
  startHour: number;
  endHour: number;
};

export function getTimelinePosition(
  date: Date,
  member: TimelineMember
) {
  const workingHours = getUTCWorkingHours(
    member.city,
    member.timezone,
    member.startHour,
    member.endHour,
    date
  );

  const start = workingHours.startUTC.getUTCHours() +
    workingHours.startUTC.getUTCMinutes() / 60;

  const end = workingHours.endUTC.getUTCHours() +
    workingHours.endUTC.getUTCMinutes() / 60;

  return {
    start,
    end,
  };
}