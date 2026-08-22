import {formatInTimeZone,fromZonedTime,} from "date-fns-tz";

export type UTCWorkingHours = {
  city: string;
  timezone: string;
  startUTC: Date;
  endUTC: Date;
};

export function getUTCWorkingHours(
  city: string,
  timezone: string,
  startHour: number,
  endHour: number,
  date: Date = new Date()
): UTCWorkingHours {
  const dateString = formatInTimeZone(
    date,
    timezone,
    "yyyy-MM-dd"
  );

  const startLocal = `${dateString} ${String(startHour).padStart(
    2,
    "0"
  )}:00:00`;

  const endLocal = `${dateString} ${String(endHour).padStart(
    2,
    "0"
  )}:00:00`;

  const startUTC = fromZonedTime(
    startLocal,
    timezone
  );

  const endUTC = fromZonedTime(
    endLocal,
    timezone
  );

  return {
    city,
    timezone,
    startUTC,
    endUTC,
  };
}

export function formatUTCDate(
  date: Date,
  timezone: string
) {
  return formatInTimeZone(
    date,
    timezone,
    "h:mm a"
  );
}