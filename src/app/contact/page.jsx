"use client";

import React from "react";
import { Card, Input, Button } from "@heroui/react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
  };

  return (
    <section className="min-h-screen bg-background px-4 py-12 md:px-8 lg:px-16 flex justify-center items-center">
      <div className="max-w-6xl w-full mx-auto space-y-12">
        <Card className="bg-green-50 dark:bg-zinc-800 border-none shadow-sm rounded-3xl p-6 sm:p-10 md:p-14">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-lime-500 font-serif italic text-lg md:text-xl font-medium">
                Contact Us
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                Feel Free To Write
              </h3>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  placeholder="Your Name"
                  variant="flat"
                  size="lg"
                  className="bg-white dark:bg-zinc-900 rounded-xl"
                  required
                />
                <Input
                  type="text"
                  placeholder="Enter Subject"
                  variant="flat"
                  size="lg"
                  className="bg-white dark:bg-zinc-900 rounded-xl"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  variant="flat"
                  size="lg"
                  className="bg-white dark:bg-zinc-900 rounded-xl"
                  required
                />
                <Input
                  type="tel"
                  placeholder="Enter Phone"
                  variant="flat"
                  size="lg"
                  className="bg-white dark:bg-zinc-900 rounded-xl"
                />
              </div>

              <textarea
                placeholder="Your Message Here"
                rows={5}
                className="w-full p-4 rounded-xl bg-white dark:bg-zinc-900 border-none outline-none text-sm text-foreground focus:ring-2 focus:ring-primary/20 placeholder:text-default-400 transition-all resize-y"
                required
              />

              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-lime-400 text-white font-semibold px-10 py-6 rounded-full shadow-md hover:bg-lime-600 transition-colors"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Address Card */}
          <Card className="bg-green-50 dark:bg-zinc-800 border-none shadow-sm rounded-2xl p-6">
            <div className="flex flex-row items-center gap-4">
              <div className="bg-[#211f26] text-white p-3.5 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-base">
                  Our Address
                </h4>
                <p className="text-default-500 text-xs sm:text-sm leading-snug">
                  Indira Road, Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </Card>

          {/* Phone Card */}
          <Card className="bg-green-50 dark:bg-zinc-800 border-none shadow-sm rounded-2xl p-6">
            <div className="flex flex-row items-center gap-4">
              <div className="bg-[#211f26] text-white p-3.5 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-base">
                  Phone Number
                </h4>
                <p className="text-default-500 text-xs sm:text-sm leading-snug">
                  +88 01 752 485143
                </p>
              </div>
            </div>
          </Card>

          {/* Email Card */}
          <Card className="bg-green-50 dark:bg-zinc-800 border-none shadow-sm rounded-2xl p-6">
            <div className="flex flex-row items-center gap-4">
              <div className="bg-[#211f26] text-white p-3.5 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-base">
                  Email Address
                </h4>
                <p className="text-default-500 text-xs sm:text-sm leading-snug">
                  softpolli@mail.com
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-green-50 dark:bg-zinc-800 border-none shadow-sm rounded-3xl p-3 sm:p-4 overflow-hidden">
          <div className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden">
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10328.034660450694!2d90.37547656223492!3d23.76478721761585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70030f72dad%3A0xb1e04b25c323f66e!2sBangladesh%20National%20Parliament%20House!5e0!3m2!1sen!2sbd!4v1784545632674!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
