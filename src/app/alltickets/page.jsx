import TicketCards from "@/components/TicketCards";
import PaginationPart from "@/components/PaginationPart";

const AllTicketpage = async ({ searchParams }) => {
    const searchQuery = await searchParams;
    const currentPage = Number(searchQuery.page) || 1;
    const limit = searchQuery.limit || 6;
    const from = searchQuery?.from || "";
    const to = searchQuery?.to || "";

    console.log(currentPage)

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/alltickets?from=${from}&to=${to}&page=${currentPage}`,
        {
            cache: "no-store",
        },
    );
    
    const data = await res.json();
    // console.log(data)
    const alltickets = data?.result || [];
    const totalPage = data?.total_page || 1;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl text-center font-bold mb-10">
                All Avalable Tickets
            </h2>
            {alltickets.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-semibold">
                    No tickets found matching your search.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {alltickets.map((ticket) => (
                        <TicketCards key={ticket._id} ticket={ticket} />
                    ))}
                </div>
            )}

            <div className="mt-10">
                <PaginationPart totalPage={totalPage} page={currentPage} from={from} to={to} />
            </div>
        </div>
    );
};

export default AllTicketpage;