import React from "react";
import { Button } from "@/components/ui/button";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black dark:bg-black dark:text-white px-6">
      <h1 className="text-5xl font-bold mb-4">Coming Soon</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        We&apos;re preparing something special. Stay tuned!
      </p>
      <Button
        variant="outline"
        className="border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
        
      >
        Refresh
      </Button>
    </div>
  );
};

export default ComingSoon;
