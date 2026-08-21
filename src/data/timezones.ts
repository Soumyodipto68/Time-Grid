export type TimezoneLocation = {
  id: string;
  city: string;
  country: string;
  timezone: string;
  startHour: number;
  endHour: number;
};

export const timezoneLocations: TimezoneLocation[] = [
  {
    id: "kolkata",
    city: "Kolkata",
    country: "🇮🇳",
    timezone: "Asia/Kolkata",
    startHour: 10,
    endHour: 19,
  },
  {
    id: "new-york",
    city: "New York",
    country: "🇺🇸",
    timezone: "America/New_York",
    startHour: 9,
    endHour: 17,
  },
  {
    id: "london",
    city: "London",
    country: "🇬🇧",
    timezone: "Europe/London",
    startHour: 9,
    endHour: 17,
  },
  {
    id: "tokyo",
    city: "Tokyo",
    country: "🇯🇵",
    timezone: "Asia/Tokyo",
    startHour: 10,
    endHour: 19,
  },
];