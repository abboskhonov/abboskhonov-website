"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Send,
} from "lucide-react";
import Navbar from "@/components/navbar";
import { useSendMessage } from "@/hooks/useSendMessage";

export default function ContactPage() {
  const { mutate, isPending, isSuccess, isError } = useSendMessage();

  const [form, setForm] = useState({
    name: "",
    telegram: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <>
      <Navbar />
      <section className="max-w-6xl mx-auto px-5 py-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold tracking-tight mb-3">Contact</h2>
          <p className="text-muted-foreground text-lg">
            Let's collaborate and build something amazing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h3 className="text-lg font-semibold mb-3">Get in touch</h3>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <span className="text-base">abboskhonow@gmail.com</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Follow</h3>
              <div className="flex gap-3">
                {[  
                  { href: "https://github.com/abboskhonov", icon: Github },
                  { href: "https://linkedin.com/in/yourprofile", icon: Linkedin },
                  { href: "https://twitter.com/abboskhonow", icon: Twitter },
                  { href: "https://t.me/abboskhonov", icon: Send },
                ].map(({ href, icon: Icon }, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="icon"
                    asChild
                    className="transition-transform hover:scale-105"
                  >
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border rounded-xl shadow-sm p-5 ">
            <h3 className="text-2xl font-semibold mb-5">Send a message</h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="h-11"
              />
              <Input
                name="telegram"
                value={form.telegram}
                onChange={handleChange}
                placeholder="Your Telegram Username (e.g., @username)"
                className="h-11"
              />
              <Textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="min-h-[120px] resize-none"
              />
              <Button type="submit" disabled={isPending} className="w-full flex items-center gap-2 h-11">
                <Send className="w-4 h-4" />
                {isPending ? "Sending..." : "Send Message"}
              </Button>
              {isSuccess && <p className="text-green-500 text-sm">✅ Message sent!</p>}
              {isError && <p className="text-red-500 text-sm">❌ Failed to send. Try again.</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}