import React from "react";
import { Button } from "@/components/ui/button";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-6">
      <h1 className="text-5xl font-bold mb-4">Coming Soon</h1>
      <p className="text-lg mb-6 text-center max-w-md text-foreground/90">
        We&apos;re preparing something special. Stay tuned!
      </p>
      <Button
        variant="outline"
        className="border-border text-foreground hover:bg-popover hover:text-foreground"
      >
        Refresh
      </Button>
    </div>
  );
};

export default ComingSoon;
