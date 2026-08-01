"use client";

import React from "react";
import { Card } from "@heroui/react";
import { motion } from "motion/react";

export default function BookingRoadmap() {
  const steps = [
    {
      id: 1,
      title: "Online Booking",
      description:
        "Mixture Of Metal And Other Elents Hey Generay Provide Dreter.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-3.75-12H5.25A2.25 2.25 0 0 0 3 8.25v8.25A2.25 2.25 0 0 0 5.25 18.75h13.5a2.25 2.25 0 0 0 2.25-2.25V11.25M15 11.25h.008v.008H15v-.008Zm0 3h.008v.008H15v-.008Zm0 3h.008v.008H15v-.008Z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Flight Ticket",
      description:
        "Mixture Of Metal And Other Elents Hey Generay Provide Dreter.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Confirm Travel",
      description:
        "Mixture Of Metal And Other Elents Hey Generay Provide Dreter.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Easy Payments",
      description:
        "Mixture Of Metal And Other Elents Hey Generay Provide Dreter.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
      ),
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-[0.03] pointer-events-none bg-center bg-no-repeat bg-contain mix-blend-multiply dark:mix-blend-normal"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1400')`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <span className="font-serif italic text-xl md:text-2xl text-sky-500 dark:text-sky-400 mb-3 select-none block">
            Booking Roadmap
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight mb-2">
            4 Easy Steps
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight mb-12 md:mb-16">
            Source Incredible Journey
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-8 w-full"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Card className="flex flex-col items-center justify-between text-center p-5 bg-white dark:bg-zinc-900/40 border border-slate-200/60 dark:border-zinc-800/60 shadow-sm rounded-3xl group transition-all duration-300 hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-400/20 h-full">
                  <div className="flex flex-col items-center w-full">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 mb-6 border-[3px] border-dashed border-sky-200/50 dark:border-sky-800/40"
                    >
                      <div className="absolute inset-1 rounded-full border border-white/20" />
                      {step.icon}
                    </motion.div>

                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-zinc-100 mb-2.5 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {step.title}
                    </h3>

                    <p className="text-sm md:text-base text-slate-500 dark:text-zinc-400 leading-relaxed max-w-[250px]">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 md:mt-8 flex justify-center w-full">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Go to ${step.title}`}
                      className="w-10 h-10 rounded-full bg-slate-900 dark:bg-zinc-800 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 text-white flex items-center justify-center transition-colors duration-300 shadow-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        className="w-4 h-4 transform rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
