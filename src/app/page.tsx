"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import LocalTimeGrid from "../components/LocalTimeGrid";
import WorkingHoursTimeline from "../components/WorkingHoursTimeline";

import { useTeam } from "../context/TeamContext";
import { decodeTeam } from "../lib/teamUrl";

export default function Home() {
  const searchParams = useSearchParams();

  const { setMembersFromUrl } = useTeam();

  useEffect(() => {
    const encodedTeam = searchParams.get("team");

    if (!encodedTeam) {
      return;
    }

    const decodedTeam = decodeTeam(encodedTeam);

    if (!decodedTeam) {
      console.error(
        "Invalid shared team URL"
      );

      return;
    }

    setMembersFromUrl(decodedTeam);
  }, [ searchParams, setMembersFromUrl,]);

  return (
    <main className="flex min-h-screen bg-[#070b12] text-white">
      <Sidebar />

      <section className="min-w-0 flex-1 overflow-hidden p-8">
        <Header />

        <LocalTimeGrid />

        <WorkingHoursTimeline />
      </section>
    </main>
  );
}