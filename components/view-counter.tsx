"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

type ViewCounterProps = {
  pageKey?: string;
};

const ViewCounter = ({ pageKey = "home" }: ViewCounterProps) => {
  const [views, setViews] = useState(0);
  const storageKey = `viewed-${pageKey}`;

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch("/api/views", { method: "GET" });
        const data = await response.json();
        setViews(data.views);
      } catch (error) {
        console.error("Error fetching views:", error);
      }
    };

    const incrementIfNeeded = async () => {
      if (typeof window === "undefined") return;

      const hasViewedInSession = sessionStorage.getItem(storageKey);
      if (!hasViewedInSession) {
        try {
          await fetch("/api/views", { method: "POST" });
          sessionStorage.setItem(storageKey, "true");
        } catch (error) {
          console.error("Error incrementing views:", error);
        }
      }
    };

    incrementIfNeeded().finally(fetchViews);
  }, [storageKey]);

  return (
    <span className="text-sm text-muted-foreground inline-flex items-center gap-1">
      <Eye size={14} aria-hidden="true" />
      {views}
    </span>
  );
};

export default ViewCounter;
