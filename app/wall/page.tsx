"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Message = { id: number; user: string; text: string };

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState("");
  const [text, setText] = useState("");

  async function loadMessages() {
    const data = await api.get("/chat");
    setMessages(data);
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    await api.post("/api/chat", { user, text });
    setText("");
    loadMessages(); // refresh after sending
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Basic Chat</h1>

      <div className="border p-2 h-64 overflow-y-auto mb-4">
        {messages.map((m) => (
          <div key={m.id}>
            <b>{m.user}:</b> {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <input
          className="border p-2 flex-1"
          placeholder="Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-4">Send</button>
      </form>
    </main>
  );
}
