import { api } from "@/lib/api";

export type MessagePayload = {
  name: string;
  telegram: string;
  message: string;
};

export async function sendMessage(payload: MessagePayload) {
  const res = await api.post("/send-message", payload);
  return res.data;
}
