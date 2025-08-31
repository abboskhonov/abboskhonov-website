"use client";

import { useMutation } from "@tanstack/react-query";
import { sendMessage, type MessagePayload } from "@/lib/api/contact";

export function useSendMessage() {
  return useMutation({
    mutationFn: (payload: MessagePayload) => sendMessage(payload),
  });
}
