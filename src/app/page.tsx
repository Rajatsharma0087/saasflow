import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features"; // Add this

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features /> {/* Add this */}
    </main>
  );
}

