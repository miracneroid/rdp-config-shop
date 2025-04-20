
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import PuzzleNavbar from "@/components/PuzzleNavbar";
import PuzzleHero from "@/components/PuzzleHero";
import Footer from "@/components/Footer";

const Index = () => {
  const { setTheme } = useTheme();
  
  // Set light mode as default
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  
  return (
    <div className="min-h-screen bg-white dark:bg-puzzle-dark w-full">
      <PuzzleNavbar />
      <main className="w-full bg-transparent">
        <PuzzleHero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
