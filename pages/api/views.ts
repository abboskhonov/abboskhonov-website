// pages/api/views.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ views: number }>
) {
  if (req.method === "POST") {
    const views = await kv.incr("home-page-views");
    res.status(200).json({ views: Number(views) }); // cast to primitive number
  } else if (req.method === "GET") {
    const views = await kv.get("home-page-views") || 0;
    res.status(200).json({ views: Number(views) });
  } else {
    res.status(405).end();
  }
}
