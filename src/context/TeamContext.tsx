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
  const [members, setMembers] =
    useState<TeamMember[]>(initialMembers);

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
  return (
    <TeamContext.Provider
      value={{
        members,
        addMember,
        removeMember,
        updateMember,
        setMembersFromUrl,
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