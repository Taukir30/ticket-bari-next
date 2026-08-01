import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";

export default function AboutDiscover() {
  const checklist = [
    "First Class Cabin",
    "Business Travel",
    "Premium Economy",
    "Now Selected Routes",
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02] pointer-events-none bg-repeat bg-[size:30px_30px]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-sky-500/10 dark:bg-sky-500/5 rounded-tl-full -translate-x-4 -translate-y-4" />

            <div className="absolute inset-0 rounded-full border-4 border-dashed border-emerald-500/30 dark:border-emerald-400/20 scale-105 animate-[spin_120s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border-[3px] border-sky-500 dark:border-sky-400 clip-path-accent" />

            <div className="w-[88%] h-[88%] rounded-full overflow-hidden border-[6px] border-white dark:border-zinc-900 shadow-xl z-10">
              <Image
                src="https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=811&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Our Stewardess / Pilot Representative"
                width={811}
                height={811}
                className="w-full h-full object-cover object-center scale-105"
              />
            </div>

            <div className="absolute right-0 top-6 w-12 h-16 opacity-30 dark:opacity-10 bg-[radial-gradient(#10b981_2px,transparent_2px)] [background-size:8px_8px]" />
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col text-center lg:text-left items-center lg:items-start">
          <span className="font-serif italic text-xl md:text-2xl text-sky-500 dark:text-sky-400 mb-2 select-none">
            About Discover
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight leading-tight mb-5">
            Your Trusted Source Incredible Journey
          </h2>

          <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 leading-relaxed mb-6 max-w-md lg:max-w-none">
            Mixtures Of A Metal And Other Elents. They Generally Provide Greater
            Over Pure Metal, Which Usually Much Softer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
            {checklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 justify-center lg:justify-start"
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-zinc-200">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 flex justify-center items-center">
          <div className="w-72 sm:w-80 h-[420px] rounded-[32px] overflow-hidden shadow-xl border border-slate-200/60 dark:border-zinc-800/60 flex flex-col relative group">
            <div className="flex-1 bg-gradient-to-b from-slate-900 to-zinc-950 p-6 flex flex-col justify-between items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-center bg-no-repeat bg-cover bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400')]" />

              <h3 className="text-white font-serif text-2xl tracking-wide relative z-10 mt-4">
                Destinations
              </h3>

              <div className="relative w-36 h-36 flex items-center justify-center bg-zinc-800/50 rounded-full border border-zinc-700/50 backdrop-blur-sm z-10">
                <Image
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300"
                  alt="Abstract render"
                  width={300}
                  height={300}
                  className="w-24 h-24 rounded-full object-cover animate-[spin_60s_linear_infinite]"
                />
              </div>
            </div>
            <div className="h-[140px] bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-500 dark:to-emerald-400 p-6 flex flex-col items-center justify-center text-center shadow-[inset_0_2px_10px_rgba(255,255,255,0.15)]">
              <span className="text-white text-4xl font-extrabold tracking-tight">
                39+
              </span>
              <span className="text-emerald-100 dark:text-emerald-50 font-bold text-xs uppercase tracking-widest mt-1">
                Year Experience
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
