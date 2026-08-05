import Statchart from "@/components/Dashboard/Statchart";
import Widget from "@/components/Dashboard/Widget";
import { protectedFetch } from "@/lib/core/server";
import { getServerSession } from "@/lib/core/session";

const RevenueOverview = async () => {

    const user = await getServerSession();
    console.log(user)

    const bookingRevenueStats = await protectedFetch(`/bookings/revenue/total?email=${user.email}`)

    const data = await protectedFetch(`/alltickets?email=${user.email}`);
    const totalAddedTickets = data.result;

    const soldData = await protectedFetch(`/bookings/tickets-sold/total`);
    const totalSoldTickets = soldData.totalTicketsSold;

    const statData = await protectedFetch(`/bookings/stats?email=${user.email}`);
    console.log(statData)

    return (
        <div className='flex flex-col gap-5'>
            <h1 className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">
                Revenue Overview
            </h1>
            <div className='bg-white rounded-xl shadow-xl flex flex-col gap-3'>


                <div className='p-5 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5'>
                    <Widget title={'Total Tickets Added'} data={totalAddedTickets.length} color={'green'}></Widget>
                    <Widget title={'Total Revenue (BDT)'} data={bookingRevenueStats.totalRevenue} color={'orange'}></Widget>
                    <Widget title={'Total Sold Tickets'} data={totalSoldTickets} color={'violet'}></Widget>
                </div>

                <div className='w-full text-center pt-15'>
                    <span className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">
                        Revenue Chart
                    </span>
                    <Statchart statData={statData} ></Statchart>
                </div>
            </div>

        </div>
    );
};

export default RevenueOverview;