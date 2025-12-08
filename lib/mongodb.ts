/**
 * Mongoose helper for Next.js
 *
 * Exports:
 * - connectToDatabase(): Promise<void>
 * - incrementPageView(page: string): Promise<number>  // returns new views count
 * - getPageViews(page: string): Promise<number>
 *
 * Usage (example in pages/api/views.ts):
 *
 * import type { NextApiRequest, NextApiResponse } from "next";
 * import { incrementPageView, getPageViews } from "lib/mongodb";
 *
 * export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 *   const page = "home"; // or derive from req
 *   if (req.method === "POST") {
 *     const views = await incrementPageView(page);
 *     return res.status(200).json({ views });
 *   } else if (req.method === "GET") {
 *     const views = await getPageViews(page);
 *     return res.status(200).json({ views });
 *   }
 *   res.status(405).end();
 * }
 *
 * Note:
 * - Make sure `MONGO_URI` is set in your environment (.env.local).
 * - In development we reuse the connection across module reloads to avoid connection storms.
 */

import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB || "abboskhonov_site";

if (!uri) {
  // Prefer failing fast so the developer knows to set MONGO_URI
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

// Page view schema
const PageViewSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true },
  views: { type: Number, default: 0 }
});

const PageView = mongoose.models.PageView || mongoose.model("PageView", PageViewSchema);

/**
 * Global is used here to preserve the value across module reloads in development.
 * This prevents creating new connections on every hot-reload.
 */
declare global {
  var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to the database
 */
async function connectToDatabase(): Promise<void> {
  if (cached.conn) {
    return;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

/**
 * Increment views for a given page (upsert).
 * Returns the new views count as a number.
 */
export async function incrementPageView(page: string): Promise<number> {
  await connectToDatabase();
  
  const result = await PageView.findOneAndUpdate(
    { page },
    { $inc: { views: 1 } },
    {
      upsert: true,
      new: true, // Return the updated document
    }
  );

  return result?.views || 0;
}

/**
 * Get current view count for a page.
 */
export async function getPageViews(page: string): Promise<number> {
  await connectToDatabase();
  
  const result = await PageView.findOne({ page });
  return result?.views || 0;
}

/**
 * (Optional) Helper to set an explicit value for views.
 * Useful for admin scripts or testing.
 */
export async function setPageViews(page: string, value: number): Promise<void> {
  await connectToDatabase();
  
  await PageView.findOneAndUpdate(
    { page },
    { $set: { views: value } },
    { upsert: true }
  );
}
