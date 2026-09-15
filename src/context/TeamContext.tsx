"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type TeamMember = {
  id: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
  startHour: number;
  endHour: number;
};

export type TimeFormat = "12h" | "24h";

type TeamContextType = {
  members: TeamMember[];
  addMember: (member: TeamMember) => void;
  removeMember: (id: string) => void;
  updateMember: (id: string, updatedMember: Partial<TeamMember>) => void;
  setMembersFromUrl: (members: TeamMember[]) => void;

  loadSchedule: (
    scheduleId: string,
    members: TeamMember[],
    name: string,
  ) => void;

  saveSchedule: (name: string) => Promise<void>;
  deleteSchedule: () => Promise<void>;

  savedScheduleId: string | null;
  savedScheduleName: string | null;

  timeFormat: TimeFormat;
  setTimeFormat: (format: TimeFormat) => void;
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

export function TeamProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

  const [savedScheduleId, setSavedScheduleId] = useState<string | null>(null);

  const [savedScheduleName, setSavedScheduleName] = useState<string | null>(
    null,
  );

  const [timeFormat, setTimeFormat] = useState<TimeFormat>("12h");

  function addMember(member: TeamMember) {
    setMembers((current) => [...current, member]);
  }

  function removeMember(id: string) {
    setMembers((current) => current.filter((member) => member.id !== id));
  }

  function updateMember(id: string, updates: Partial<TeamMember>) {
    setMembers((current) =>
      current.map((member) =>
        member.id === id ? { ...member, ...updates } : member,
      ),
    );
  }

  const setMembersFromUrl = useCallback((newMembers: TeamMember[]) => {
    setMembers(newMembers);
    setSavedScheduleId(null);
    setSavedScheduleName(null);
  }, []);

  const loadSchedule = useCallback(
    (scheduleId: string, newMembers: TeamMember[], name: string) => {
      setMembers(newMembers);
      setSavedScheduleId(scheduleId);
      setSavedScheduleName(name);
    },
    [],
  );

  const saveSchedule = async (name: string) => {
    try {
      const trimmedName = name.trim();

      if (!trimmedName) {
        throw new Error("Schedule name is required");
      }

      const payload = {
        name: trimmedName,
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
        response = await fetch(`/api/schedules/${savedScheduleId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
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
          error.details || error.error || "Failed to save schedule",
        );
      }

      const schedule = await response.json();

      setSavedScheduleId(schedule.id);
      setSavedScheduleName(schedule.name);

      console.log("Schedule saved:", schedule);

      alert(
        savedScheduleId
          ? "Schedule updated successfully! 🎉"
          : "Schedule saved successfully! 🎉",
      );
    } catch (error) {
      console.error("Save schedule error:", error);

      alert(
        error instanceof Error ? error.message : "Failed to save schedule.",
      );

      throw error;
    }
  };

  const deleteSchedule = async () => {
    if (!savedScheduleId) {
      alert("There is no saved schedule to delete.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this schedule?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/schedules/${savedScheduleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(
          error.details || error.error || "Failed to delete schedule",
        );
      }

      setSavedScheduleId(null);
      setSavedScheduleName(null);

      alert("Schedule deleted successfully! 🗑️");
    } catch (error) {
      console.error("Delete schedule error:", error);

      alert("Failed to delete schedule.");
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
        loadSchedule,
        saveSchedule,
        savedScheduleId,
        savedScheduleName,
        deleteSchedule,
        timeFormat,
        setTimeFormat,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);

  if (!context) {
    throw new Error("useTeam must be used inside TeamProvider");
  }

  return context;
}
