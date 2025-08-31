"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Send, 
  Phone, 
  MapPin 
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to say hello? I'd love to hear from you. 
            Reach out via the form or connect through socials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="shadow-lg border rounded-2xl overflow-hidden flex flex-col">
            <CardHeader className="bg-primary/10 dark:bg-primary/20">
              <CardTitle className="text-2xl font-semibold text-primary dark:text-primary-light">
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form className="space-y-5">
                <div>
                  <Input 
                    placeholder="Your Name" 
                    className="rounded-xl h-12" 
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    className="rounded-xl h-12" 
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="Your Message" 
                    className="min-h-[120px] rounded-xl" 
                  />
                </div>
                <Button className="w-full rounded-xl h-12 text-base font-medium flex items-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </Button>
              </form>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                I'll get back to you within 24–48 hours.
              </p>
            </CardContent>
          </Card>

          {/* Contact Info & Socials */}
          <div className="space-y-8">
            {/* Personal Info */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Let’s Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I'm always open to discussing new opportunities, collaborations, or a friendly chat about tech.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>me@yourdomain.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+1 (123) 456-7890</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-5">
                Follow Me
              </h3>
              <div className="flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  className="justify-start gap-3 rounded-xl h-12"
                  asChild
                >
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                </Button>

                <Button 
                  variant="outline" 
                  className="justify-start gap-3 rounded-xl h-12"
                  asChild
                >
                  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                </Button>

                <Button 
                  variant="outline" 
                  className="justify-start gap-3 rounded-xl h-12"
                  asChild
                >
                  <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-5 h-5" />
                    X (Twitter)
                  </a>
                </Button>

                <Button 
                  variant="outline" 
                  className="justify-start gap-3 rounded-xl h-12"
                  asChild
                >
                  <a href="https://t.me/yourtelegram" target="_blank" rel="noopener noreferrer">
                    <Send className="w-5 h-5" />
                    Telegram: @your_tg_username
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Your Name. Built with Next.js & Tailwind CSS.
        </footer>
      </div>
    </div>
  );
}