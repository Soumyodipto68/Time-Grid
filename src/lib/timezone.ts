import {fromZonedTime,formatInTimeZone,} from "date-fns-tz";

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
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const startLocal = new Date(
    year,
    month,
    day,
    startHour,
    0,
    0
  );

  const endLocal = new Date(
    year,
    month,
    day,
    endHour,
    0,
    0
  );

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