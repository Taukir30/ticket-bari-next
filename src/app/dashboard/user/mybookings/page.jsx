import BookedCard from "@/components/Dashboard/BookedCard";

const MyBookingPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allbookings`,
    {
      cache: "no-store",
    });
  // const res = await fetch("http://localhost:5000/alltickets");
  const bookedticket = await res.json();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-1">
      <h2 className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">My Booked Tickets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {bookedticket.map((ticket) => <BookedCard key={ticket._id} bookedData={ticket} />)}
      </div>
    </div>
  );
};

export default MyBookingPage;
