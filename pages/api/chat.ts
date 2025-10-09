import { NextResponse } from "next/server";

let messages: { id: number; user: string; text: string }[] = [];
let id = 1;

export async function GET() {
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const { user, text } = await req.json();
  const message = { id: id++, user, text };
  messages.push(message);
  return NextResponse.json(message, { status: 201 });
}
