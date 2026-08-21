import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#080c14] text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <Header />
      </section>
    </main>
  );
}