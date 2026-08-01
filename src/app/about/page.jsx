import AboutDiscover from "@/components/AboutDiscover";
import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { ShieldCheck, Clock, Award, Users, ArrowRight } from "lucide-react";

const AboutPage = () => {
  const stats = [
    { number: "150+", label: "Destinations Covered" },
    { number: "1M+", label: "Happy Travelers" },
    { number: "24/7", label: "Customer Support" },
    { number: "99%", label: "Satisfaction Rate" },
  ];

  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-sky-500" />,
      title: "Safe & Secure Booking",
      description:
        "Your data and transactions are encrypted with enterprise-grade security protocols.",
    },
    {
      icon: <Clock className="w-8 h-8 text-emerald-500" />,
      title: "Real-time Flight Updates",
      description:
        "Get instant notifications about your flight status, delays, and gate changes.",
    },
    {
      icon: <Award className="w-8 h-8 text-amber-500" />,
      title: "Best Price Guarantee",
      description:
        "We offer competitive rates with no hidden fees for all domestic and international routes.",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Dedicated Support Team",
      description:
        "Our travel experts are available around the clock to assist you with any inquiries.",
    },
  ];

  return (
    <div className="min-h-screen">
      <AboutDiscover />

      <section className="py-12 bg-white dark:bg-zinc-900 border-y border-slate-200/80 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-1">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-sky-500 dark:text-sky-400">
                  {stat.number}
                </p>
                <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-zinc-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-sky-500 dark:text-sky-400 font-serif italic text-lg sm:text-xl">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight mt-2">
            Elevating Your Travel Experience
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 mt-3 text-sm sm:text-base">
            We handle every detail of your journey so you can focus on creating
            unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start"
            >
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800/60 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-sky-600 to-emerald-600 dark:from-sky-700 dark:to-emerald-700 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl text-white">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-sky-300/20 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Ready to Start Your Next Destination?
            </h2>
            <p className="mt-4 text-sky-100 text-sm sm:text-base leading-relaxed">
              Book your tickets today with TicketBari and experience seamless
              travel across the globe with exclusive offers.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/alltickets">
                {" "}
                <Button
                  size="sm"
                  className="bg-white text-slate-900 font-bold px-8 py-6 rounded-full shadow-lg hover:bg-slate-100 transition-all flex items-center gap-2"
                >
                  Book Tickets Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
