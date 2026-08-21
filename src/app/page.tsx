import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#080c14] text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-3xl font-bold">
          Good evening, Soumyodipto! 👋
        </h1>

        <p className="mt-2 text-gray-400">
          Plan meetings effortlessly across time zones.
        </p>
      </section>
    </main>
  );
}