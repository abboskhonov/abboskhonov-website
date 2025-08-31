"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Send
} from "lucide-react";

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h2 className="text-3xl font-semibold tracking-tight mb-2">Contact</h2>
        <p className="text-muted-foreground">Let&apos;s build something together</p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input placeholder="Name" />
              <Input type="email" placeholder="Email" />
            </div>
            <Textarea 
              placeholder="Message" 
              className="min-h-[120px] resize-none" 
            />
            <Button className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send Message
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold mb-4">Get in touch</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>me@yourdomain.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              
              <Button variant="outline" size="icon" asChild>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              
              <Button variant="outline" size="icon" asChild>
                <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              
              <Button variant="outline" size="icon" asChild>
                <a href="https://t.me/yourtelegram" target="_blank" rel="noopener noreferrer">
                  <Send className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}