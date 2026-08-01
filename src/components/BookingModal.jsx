"use client";

import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function BookingModal({ ticket }) {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();
  const { data, isPending } = useSession();
  const user = data?.user;

  console.log(user)

  const departureTime = new Date(ticket.departure_date_time).getTime();
  const now = new Date().getTime();

  const hasDeparturePassed = departureTime <= now;
  const noTicketsLeft = ticket.ticket_quantity === 0;

  const isBookingDisabled = hasDeparturePassed || noTicketsLeft;

  const handleIncrease = () => {
    if (quantity < ticket.ticket_quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const totalPrice = ticket.price * quantity;

  console.log(ticket)

  const handleConfirm = async () => {

    const bookingData = {
      ticket_id: ticket._id,
      ticket_title: ticket.ticket_title,
      image_url: ticket.image_url,
      booking_quantity: quantity,
      total_price: totalPrice,
      from_location: ticket.from_location,
      to_location: ticket.to_location,
      departure_date_time: ticket.departure_date_time,
      vendor_email: ticket.vendor_email,
      user_email: user.email,
      status: 'pending',
      created_at: new Date()
    };

    console.log(bookingData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addbooking`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    })

    const resdata = await res.json();

    console.log(resdata);

    if (resdata.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Booking submitted for approval!",
        showConfirmButton: false,
        timer: 1000
      });

      router.push("/dashboard/mybookings");
    }

    setIsOpen(false);
  };

  return (
    <div>
      <button disabled={isBookingDisabled} onClick={() => setIsOpen(true)} className=" bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 text-sm disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70" >
        {hasDeparturePassed ? "Departure Time Passed" : noTicketsLeft ? "Sold Out" : "Book Now"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs p-4">
          <div className=" bg-fuchsia-50 border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold dark:text-slate-100 mb-4">
              Booking Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">

                  <span className="font-bold text-sm text-slate-700 dark:text-slate-300">
                    Quantity:
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      readOnly
                      value={quantity}
                      className="w-12 text-center border border-slate-300 dark:border-slate-700 rounded-md py-1 font-bold text-slate-800 dark:text-slate-200 bg-transparent"
                    />

                    <button
                      type="button"
                      onClick={handleIncrease}
                      className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Total Price:{" "}
                    <span className="text-emerald-600 dark:text-emerald-400">
                      ৳{totalPrice}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Available: {ticket.ticket_quantity} tickets
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <Image
                    src="https://images.unsplash.com/photo-1652018440238-1aeb20a803a7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // বা আপনার পছন্দের যেকোনো Illustration ইমেজ Path
                    alt="Booking Ticket"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleConfirm}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-xl transition shadow-md text-sm"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold px-5 py-2 rounded-xl transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
