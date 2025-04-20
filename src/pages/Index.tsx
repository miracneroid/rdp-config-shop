
import React from "react";
import PuzzleNavbar from "@/components/PuzzleNavbar";
import PuzzleHero from "@/components/PuzzleHero";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-puzzle-dark w-full">
      <PuzzleNavbar />
      <main className="w-full bg-transparent">
        <PuzzleHero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
