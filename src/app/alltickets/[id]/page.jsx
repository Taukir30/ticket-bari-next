import Link from "next/link";
import Image from "next/image";
import Countdown from "@/components/Countdown";
import BookingModal from "@/components/BookingModal";

const TicketDetailPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tickets/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-bold">Failed to load ticket details.</p>
        <Link
          href="/alltickets"
          className="text-emerald-500 underline mt-4 inline-block"
        >
          Return to list
        </Link>
      </div>
    );
  }

  const ticket = await res.json();
  console.log(ticket);

  // Format the ISO date string into something human-readable
  const formattedDate = new Date(ticket.departure_date_time).toLocaleString(
    "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );

  // Dynamic emoji selection based on your transport_type string
  const getTransportEmoji = (type) => {
    switch (type?.toLowerCase()) {
      case "ferry":
        return "🚢";
      case "bus":
        return "🚌";
      case "train":
        return "🚆";
      default:
        return "🎫";
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-5">
      <Link
        href="/alltickets"
        className="text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-2 mb-6 transition-colors"
      >
        ← Back to All Tickets
      </Link>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Visual Panel */}
        <div className="relative h-64 md:h-full min-h-87.5 bg-slate-950">
          <Image
            fill
            src={ticket.image_url}
            alt={ticket.ticket_title}
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-lime-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              {getTransportEmoji(ticket.transport_type)} {ticket.transport_type}
            </span>
          </div>
          {ticket.verification_status === "verified" && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                ✓ Verified Vendor
              </span>
            </div>
          )}
        </div>

        {/* Details Panel */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
              Provided by {ticket.vendor_name}
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-2 leading-tight">
              {ticket.ticket_title}
            </h1>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-slate-800/80">
            <div className="text-center flex-1">
              <p className="text-xs text-slate-400 uppercase font-bold">From</p>
              <p className="text-lg font-black text-slate-800 dark:text-slate-200">
                {ticket.from_location}
              </p>
            </div>
            <div className="px-4 text-slate-400 font-bold text-xl">➔</div>
            <div className="text-center flex-1">
              <p className="text-xs text-slate-400 uppercase font-bold">To</p>
              <p className="text-lg font-black text-slate-800 dark:text-slate-200">
                {ticket.to_location}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-center space-y-3 text-sm border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex justify-between w-full">
              <span className="text-slate-400 font-semibold">
                Departure Time:
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {formattedDate}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-slate-700 font-semibold">
                Departure Time Left:
              </span>
              <Countdown departureDate={ticket.departure_date_time}></Countdown>
            </div>

            <div className="flex justify-between w-full">
              <span className="text-slate-400 font-semibold">
                Available Seats:
              </span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                {ticket.ticket_quantity} Seats Left
              </span>
            </div>
          </div>

          {ticket.perks && ticket.perks.length > 0 && (
            <div>
              <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest mb-2.5">
                Onboard Perks
              </p>
              <div className="flex flex-wrap gap-2">
                {ticket.perks.map((perk, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50"
                  >
                    ✨ {perk}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Fare Price
              </p>
              <div className="flex items-baseline">
                <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                  ${ticket.price}
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  /person
                </span>
              </div>
            </div>

            <BookingModal ticket={ticket} />
            {/* <button className="bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-black px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 text-sm">

            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage;
