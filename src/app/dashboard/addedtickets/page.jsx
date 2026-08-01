import AddedCard from "@/components/Dashboard/AddedCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyAddedTickets = async () => {

  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  });

  const user = session?.user;

  console.log(user.email)

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/alltickets?email=${user.email}`,
    {
      cache: "no-store",
    });
  // const res = await fetch("http://localhost:5000/alltickets");
  const data = await res.json();
  const addedtickets = data;

  console.log(addedtickets)

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-1">
      <h2 className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">My Added Tickets </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {addedtickets.map((ticket) => (
          <AddedCard key={ticket._id} ticket={ticket} />
          // <BookedCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default MyAddedTickets;
