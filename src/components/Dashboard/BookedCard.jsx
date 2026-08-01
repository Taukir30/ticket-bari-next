import React from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import Countdown from "../Countdown";
import { Chip } from "@heroui/react";


const BookedCard = ({ bookedData }) => {

  const departureTime = new Date(bookedData.departure_date_time).getTime();
  const now = new Date().getTime();

  const hasDeparturePassed = departureTime <= now;

  const isPaymentDisabled = hasDeparturePassed || bookedData.status == 'pending';

  // Format the ISO date string into something human-readable
  const formattedDate = new Date(bookedData.departure_date_time).toLocaleString(
    "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );

  console.log(bookedData.status)

  return (
    <div className="w-full max-w-sm mx-auto h-full flex flex-col animate-fade-in-up">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex flex-col flex-1 select-none border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group">
        <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-100 dark:border-slate-800 shadow-inner">
          <Image
            width={400}
            height={200}
            src={
              bookedData.image_url ||
              "https://images.unsplash.com/photo-1551434678-e076c223a692"
            }
            alt={bookedData.bookedData_title || "Transport"}
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500 ease-out"
            priority={false}
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
          {/* <div className="absolute top-3 left-3 z-10">
            <span className="bg-slate-900/80 backdrop-blur-md text-lime-400 border border-lime-400/30 font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
              {bookedData.transport_type}
            </span>
          </div> */}
        </div>

        <div className="flex flex-1 flex-col justify-between pt-4 pb-2 space-y-4">
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-snug group-hover:text-emerald-500 dark:group-hover:text-lime-400 transition-colors line-clamp-2">
              {bookedData.ticket_title}
            </h3>
          </div>
        </div>

        <div className="relative w-full h-4 bg-transparent flex items-center shrink-0 my-1">
          <div className="absolute -left-5.75 w-4 h-4 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-transparent shadow-inner" />
          <div className="absolute -right-5.75 w-4 h-4 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-transparent shadow-inner" />
          <div className="w-full border-t border-dashed border-slate-200 dark:border-slate-700/80" />
        </div>

        {/* from location to location */}
        <div className="pt-2 flex flex-col space-y-3 shrink-0">
          <div className="flex items-center justify-between">

            <div className="pt-3 ">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-2">
                From Location
              </p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {bookedData.from_location}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">
                To Location
              </p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {bookedData.to_location}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Time and countdoun */}
        <div className="pt-2 flex flex-col space-y-3 border-t border-slate-100 dark:border-slate-800/60 shrink-0">
          <div className="flex items-center justify-between">

            <div className="pt-3 ">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-2">
                Departure Date and Time
              </p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formattedDate}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[9px] text-slate-400 font-medium uppercase text-right tracking-wider">
                Status
              </p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  {bookedData.booking_status}
                </span>
              </div>
            </div>

          </div>

          {/* countdoun */}
          <div className="flex flex-col items-center">
            <span className="text-slate-700 text-sm font-semibold">
              Time Left:
            </span>
            <Countdown departureDate={bookedData.departure_date_time} small={true} ></Countdown>
          </div>
        </div>

        {/* price and quantity */}
        <div className="pt-2 flex flex-col space-y-3 border-t border-slate-100 dark:border-slate-800/60 shrink-0">
          <div className="flex items-center justify-between">

            <div className="pt-3 ">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-2">
                Booking Quantity
              </p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {bookedData.booking_quantity}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">
                Price per unit
              </p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  ${bookedData.total_price}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  /unit
                </span>
              </div>
            </div>

          </div>

          <div className="flex gap-5">

            {bookedData.status === "paid" ? (
              <Chip color="success" className="w-full justify-center">
                Paid
              </Chip>
            ) : (
              <form action="/api/checkout_sessions" method="POST">
                <section>
                  <input readOnly type="hidden" value={bookedData.total_price} name="price" />
                  <input readOnly type="hidden" value={bookedData.ticket_title} name="ticket_title" />
                  <input readOnly type="hidden" value={bookedData.ticket_id} name="ticket_id" />
                  <input readOnly type="hidden" value={bookedData._id} name="booking_id" />
                  <input readOnly type="hidden" value={bookedData.booking_quantity} name="booking_quantity" />

                  <button
                    type="submit"
                    role="link"
                    disabled={isPaymentDisabled}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 text-sm disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    Pay Now
                  </button>
                </section>
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default BookedCard;
