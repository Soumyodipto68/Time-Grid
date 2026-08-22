"use client";

import {createContext,useContext,useState,type ReactNode,} from "react";

type SelectedMeeting = {
  startUTC: Date;
  endUTC: Date;
};

type MeetingContextType = {
  duration: number;
  setDuration: (duration: number) => void;

  selectedMeeting: SelectedMeeting | null;

  selectMeeting: (
    startUTC: Date,
    endUTC: Date
  ) => void;

  clearMeeting: () => void;
};

const MeetingContext =
  createContext<MeetingContextType | null>(null);

export function MeetingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [duration, setDuration] = useState(60);

  const [selectedMeeting, setSelectedMeeting] =
    useState<SelectedMeeting | null>(null);

  function selectMeeting(
    startUTC: Date,
    endUTC: Date
  ) {
    setSelectedMeeting({
      startUTC,
      endUTC,
    });
  }

  function clearMeeting() {
    setSelectedMeeting(null);
  }

  return (
    <MeetingContext.Provider
      value={{
        duration,
        setDuration,
        selectedMeeting,
        selectMeeting,
        clearMeeting,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
}

export function useMeeting() {
  const context = useContext(MeetingContext);

  if (!context) {
    throw new Error(
      "useMeeting must be used inside MeetingProvider"
    );
  }

  return context;
}