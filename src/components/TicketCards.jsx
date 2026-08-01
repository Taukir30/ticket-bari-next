import React from "react";
import Image from "next/image";
import Link from "next/link";

const TicketCards = ({ ticket }) => {
  if (!ticket) return null;

  return (
    <div className="w-full max-w-sm mx-auto transition-all duration-300 group h-full flex flex-col">
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden flex flex-col flex-1 select-none border border-slate-100 dark:border-slate-800 shadow-md group-hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="relative h-48 sm:h-52 bg-slate-950 text-white overflow-hidden shrink-0">
          <Image
            width={400}
            height={150}
            src={
              ticket.image_url ||
              "https://images.unsplash.com/photo-1551434678-e076c223a692"
            }
            alt={ticket.ticket_title || "Transport"}
            className="w-full h-auto object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute top-4 left-4 z-10">
            <span className="bg-lime-400 text-slate-950 font-black text-[11px] px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              {ticket.transport_type}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight leading-snug group-hover:text-lime-500 transition-colors line-clamp-2">
              {ticket.ticket_title}
            </h3>
          </div>

          {ticket.perks && ticket.perks.length > 0 && (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-2.5">
                Included Perks
              </p>
              <div className="flex flex-wrap gap-1.5">
                {ticket.perks.map((perk, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/50"
                  >
                    ✨ {perk}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative w-full h-4 bg-transparent flex items-center shrink-0">
          <div className="absolute -left-2.5 w-5 h-5 rounded-full bg-slate-50 dark:bg-slate-950 border-r border-slate-200/40 dark:border-transparent" />
          <div className="absolute -right-2.5 w-5 h-5 rounded-full bg-slate-50 dark:bg-slate-950 border-l border-slate-200/40 dark:border-transparent" />
          <div className="w-full border-t-2 border-dashed border-slate-200 dark:border-slate-700 mx-4" />
        </div>

        <div className="px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Price per unit
            </p>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                ${ticket.price}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                /unit
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-md">
              {ticket.ticket_quantity} Tickets Left
            </span>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 px-5 sm:px-6 py-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <Link
            href={`/alltickets/${ticket._id}`}
            className="w-full bg-slate-900 dark:bg-slate-800 text-white font-extrabold text-sm px-5 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-lime-400 hover:text-slate-950 dark:hover:bg-lime-400 dark:hover:text-slate-950 transition-all duration-200 active:scale-[0.98]"
          >
            See Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCards;
