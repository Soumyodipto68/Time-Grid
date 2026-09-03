"use client";

import { createContext, useContext, useState,useCallback, type ReactNode,} from "react";

export type TeamMember = {
  id: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
  startHour: number;
  endHour: number;
};

type TeamContextType = {
  members: TeamMember[];
  addMember: (member: TeamMember) => void;
  removeMember: (id: string) => void;
  updateMember: (
    id: string,
    updatedMember: Partial<TeamMember>
  ) => void;
  setMembersFromUrl: (
    members: TeamMember[]
  ) => void;
  saveSchedule: () => Promise<void>;
  savedScheduleId: string | null;
};

const TeamContext = createContext<TeamContextType | null>(null);

const initialMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex",
    city: "Kolkata",
    country: "🇮🇳",
    timezone: "Asia/Kolkata",
    startHour: 10,
    endHour: 19,
  },
  {
    id: "2",
    name: "Sarah",
    city: "London",
    country: "🇬🇧",
    timezone: "Europe/London",
    startHour: 9,
    endHour: 17,
  },
  {
    id: "3",
    name: "John",
    city: "New York",
    country: "🇺🇸",
    timezone: "America/New_York",
    startHour: 9,
    endHour: 17,
  },
];

export function TeamProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

const [savedScheduleId, setSavedScheduleId] = useState<string | null>(null);

  function addMember(member: TeamMember) {
    setMembers((current) => [
      ...current,
      member,
    ]);
  }

  function removeMember(id: string) {
    setMembers((current) =>
      current.filter(
        (member) => member.id !== id
      )
    );
  }

  function updateMember(id: string,updates: Partial<TeamMember>) {
    setMembers((current) =>
      current.map((member) =>
        member.id === id
          ? {
              ...member,
              ...updates,
            }
          : member
      )
    );
  }
const setMembersFromUrl =
  useCallback(
    (newMembers: TeamMember[]) => {
      setMembers(newMembers);
    },
    []
  );
  
const saveSchedule = async () => {
  try {
    const userResponse = await fetch("/api/users/demo");

    if (!userResponse.ok) {
      throw new Error("Failed to get user");
    }

    const user = await userResponse.json();

    const payload = {
      name: "Remote Team",
      userId: user.id,
      members: members.map((member) => ({
        name: member.name,
        city: member.city,
        country: member.country,
        timezone: member.timezone,
        startHour: member.startHour,
        endHour: member.endHour,
      })),
    };

    let response: Response;

if (savedScheduleId) {
  response = await fetch(
    `/api/schedules/${savedScheduleId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        userId: user.id,
        members: payload.members,
      }),
    }
  );
} else {
      // Create new schedule
      response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    if (!response.ok) {
      const error = await response.json();

      throw new Error(
        error.details ||
          error.error ||
          "Failed to save schedule"
      );
    }

    const schedule = await response.json();

    setSavedScheduleId(schedule.id);

    console.log("Schedule saved:", schedule);

    alert(
      savedScheduleId
        ? "Schedule updated successfully! 🎉"
        : "Schedule saved successfully! 🎉"
    );
  } catch (error) {
    console.error("Save schedule error:", error);

    alert("Failed to save schedule.");
  }
};
  return (
    <TeamContext.Provider
      value={{
        members,
        addMember,
        removeMember,
        updateMember,
        setMembersFromUrl,
        saveSchedule,
        savedScheduleId,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);

  if (!context) {
    throw new Error(
      "useTeam must be used inside TeamProvider"
    );
  }

  return context;
}