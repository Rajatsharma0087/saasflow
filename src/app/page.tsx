import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* The Navbar stays at the top */}
      <Navbar />
      
      {/* The Hero is the first thing users see */}
      <Hero />
      
      {/* The Features explain the value */}
      <Features />
      
      {/* 2. The Pricing shows the cost (Added here) */}
      <Pricing />
      
      {/* Footer Section (Optional but recommended) */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SaaSFlow. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}