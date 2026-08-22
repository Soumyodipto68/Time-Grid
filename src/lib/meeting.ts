import {getUTCWorkingHours,type UTCWorkingHours,} from "./timezone";

type MemberForMeeting = {
  city: string;
  timezone: string;
  startHour: number;
  endHour: number;
};

export function calculateUTCOverlap(
  members: MemberForMeeting[],
  date: Date = new Date()
) {
  if (members.length === 0) {
    return null;
  }

  const workingHours: UTCWorkingHours[] =
    members.map((member) =>
      getUTCWorkingHours(
        member.city,
        member.timezone,
        member.startHour,
        member.endHour,
        date
      )
    );

  const latestStart = new Date(
    Math.max(
      ...workingHours.map((member) =>
        member.startUTC.getTime()
      )
    )
  );

  const earliestEnd = new Date(
    Math.min(
      ...workingHours.map((member) =>
        member.endUTC.getTime()
      )
    )
  );

  if (
    latestStart.getTime() >=
    earliestEnd.getTime()
  ) {
    return null;
  }

  const duration =
    (earliestEnd.getTime() -
      latestStart.getTime()) /
    (1000 * 60 * 60);

  return {
    startUTC: latestStart,
    endUTC: earliestEnd,
    duration,
    members: workingHours,
  };
}

export type MeetingSlot = {
  startUTC: Date;
  endUTC: Date;
  duration: number;
};

export function findMeetingSlots(
  overlap: {
    startUTC: Date;
    endUTC: Date;
  } | null,
  durationMinutes: number
): MeetingSlot[] {
  if (!overlap) {
    return [];
  }

  const durationMs = durationMinutes * 60 * 1000;

  const slots: MeetingSlot[] = [];

  let currentStart = overlap.startUTC.getTime();

  const endTime = overlap.endUTC.getTime();

  while (currentStart + durationMs <= endTime) {
    const currentEnd = currentStart + durationMs;

    slots.push({
      startUTC: new Date(currentStart),
      endUTC: new Date(currentEnd),
      duration: durationMinutes,
    });

    // Move forward by 30 minutes
    currentStart += 30 * 60 * 1000;
  }

  return slots;
}