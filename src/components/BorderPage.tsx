
import React from "react";

/**
 * BorderPage component wraps its children with a minimal border that
 * can be globally configured. Adjust padding/border style as needed.
 */
const BorderPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full max-w-full p-2 sm:p-4 md:p-8 bg-white border border-gray-300 rounded-none shadow-none box-border">
      {children}
    </div>
  );
};

export default BorderPage;

