export type TeamMember = {
  id: string;
  name: string;
  city: string;
  timezone: string;
  workingHours: string;
  status: "Works Now" | "Working" | "Ends Soon";
  initials: string;
};

export const members: TeamMember[] = [
  {
    id: "you",
    name: "You",
    city: "Kolkata",
    timezone: "Asia/Kolkata",
    workingHours: "Mon – Fri, 10:00 AM – 7:00 PM",
    status: "Works Now",
    initials: "YO",
  },
  {
    id: "alice",
    name: "Alice",
    city: "New York",
    timezone: "America/New_York",
    workingHours: "Mon – Fri, 9:00 AM – 5:00 PM",
    status: "Working",
    initials: "AL",
  },
  {
    id: "bob",
    name: "Bob",
    city: "London",
    timezone: "Europe/London",
    workingHours: "Mon – Fri, 9:00 AM – 5:00 PM",
    status: "Working",
    initials: "BO",
  },
  {
    id: "ken",
    name: "Ken",
    city: "Tokyo",
    timezone: "Asia/Tokyo",
    workingHours: "Mon – Fri, 10:00 AM – 7:00 PM",
    status: "Ends Soon",
    initials: "KE",
  },
];