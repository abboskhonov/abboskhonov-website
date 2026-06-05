"use client";

import { createContext, useContext } from "react";
import type { ContributionGraphContextType } from "./types";

export const ContributionGraphContext =
  createContext<ContributionGraphContextType | null>(null);

export const useContributionGraph = () => {
  const context = useContext(ContributionGraphContext);

  if (!context) {
    throw new Error(
      "ContributionGraph components must be used within a ContributionGraph"
    );
  }

  return context;
};
