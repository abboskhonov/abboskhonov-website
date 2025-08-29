"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-lg shadow-md border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Contact Us
          </CardTitle>  
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Input placeholder="Your Name" className="rounded-xl" />
            </div>
            <div>
              <Input type="email" placeholder="Your Email" className="rounded-xl" />
            </div>
            <div>
              <Textarea placeholder="Your Message" className="min-h-[120px] rounded-xl" />
            </div>
            <Button className="w-full rounded-xl">Send Message</Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Or reach us at <span className="font-medium text-gray-700">support@cardly.com</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
