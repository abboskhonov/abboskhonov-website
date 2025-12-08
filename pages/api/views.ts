// pages/api/views.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { incrementPageView, getPageViews } from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ views: number } | { error: string }>,
) {
  const pageKey = "home"; // identifier for the page whose views we track

  try {
    if (req.method === "POST") {
      const views = await incrementPageView(pageKey);
      res.status(200).json({ views });
    } else if (req.method === "GET") {
      const views = await getPageViews(pageKey);
      res.status(200).json({ views });
    } else {
      res.setHeader("Allow", "GET, POST");
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (err: unknown) {
    console.error("Views API error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
