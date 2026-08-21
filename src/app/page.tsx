import Header from "../components/Header";
import LocalTimeGrid from "../components/LocalTimeGrid";
import Sidebar from "../components/Sidebar";
import WorkingHoursTimeline from "../components/WorkingHoursTimeline";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#080c14] text-white">
      <Sidebar />

      <section className="flex-1 overflow-y-auto p-10">
        <Header />

        <LocalTimeGrid />

        <WorkingHoursTimeline />
      </section>
    </main>
  );
}