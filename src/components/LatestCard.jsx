import React from "react";
import Image from "next/image";
import Link from "next/link";

const LatestCard = ({ ticket }) => {
  if (!ticket) return null;

  return (
    <div className="w-full max-w-sm mx-auto h-full flex flex-col animate-fade-in-up">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex flex-col flex-1 select-none border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group">
        <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-100 dark:border-slate-800 shadow-inner">
          <Image
            width={400}
            height={200}
            src={
              ticket.image_url ||
              "https://images.unsplash.com/photo-1551434678-e076c223a692"
            }
            alt={ticket.ticket_title || "Transport"}
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500 ease-out"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-slate-900/80 backdrop-blur-md text-lime-400 border border-lime-400/30 font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
              {ticket.transport_type}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between pt-4 pb-2 space-y-4">
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-snug group-hover:text-emerald-500 dark:group-hover:text-lime-400 transition-colors line-clamp-2">
              {ticket.ticket_title}
            </h3>
          </div>

          {ticket.perks && ticket.perks.length > 0 && (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 shrink-0">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-2">
                Included Perks
              </p>
              <div className="flex flex-wrap gap-1">
                {ticket.perks.slice(0, 3).map((perk, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700/60"
                  >
                    ✨ {perk}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative w-full h-4 bg-transparent flex items-center shrink-0 my-1">
          <div className="absolute -left-[23px] w-4 h-4 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-transparent shadow-inner" />
          <div className="absolute -right-[23px] w-4 h-4 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-transparent shadow-inner" />
          <div className="w-full border-t border-dashed border-slate-200 dark:border-slate-700/80" />
        </div>

        <div className="pt-2 flex flex-col space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">
                Price per unit
              </p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  ${ticket.price}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  /unit
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/40 dark:border-transparent px-2 py-0.5 rounded">
                {ticket.ticket_quantity} Left
              </span>
            </div>
          </div>

          <Link
            href={`/alltickets/${ticket._id}`}
            className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-lime-400 text-white dark:text-slate-200 hover:text-white dark:hover:text-slate-950 font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 shadow-sm active:scale-[0.98]"
          >
            See Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
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

export default LatestCard;
