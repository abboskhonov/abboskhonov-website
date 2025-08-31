// pages/api/send-message.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { name, telegram, message } = req.body;

    if (!name || !telegram || !message) {
      return res.status(400).json({ error: "Name, Email and Message are required" });
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

    // formatted message
    const formattedMessage = `
📩 *New Contact Form Message*

👤 *Name:* ${name}
📧 ${telegram}

💬 *Message:*
    ${message}
    `;

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: formattedMessage,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return res.status(500).json({ error });
    }

    return res.status(200).json({ success: true });
  } catch (error: string | any) {
    return res.status(500).json({ error: error.message });
  }
}
