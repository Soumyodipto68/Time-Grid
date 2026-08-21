export type WorkingHour = {
  city: string;
  start: number;
  end: number;
};

export function findOverlap(hours: WorkingHour[]) {
  if (hours.length === 0) {
    return null;
  }

  const latestStart = Math.max(
    ...hours.map((member) => member.start)
  );

  const earliestEnd = Math.min(
    ...hours.map((member) => member.end)
  );

  if (latestStart >= earliestEnd) {
    return null;
  }

  return {
    start: latestStart,
    end: earliestEnd,
    duration: earliestEnd - latestStart,
  };
}