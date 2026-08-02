import AdvertiseButton from "@/components/Dashboard/AdvertiseButton";
import { Table } from "@heroui/react";


const AdvertiseTicketPage = async () => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/alltickets?status=approved`,
    {
      cache: "no-store",
    }
  );
  // const res = await fetch("http://localhost:5000/alltickets");
  const data = await res.json();
  const alltickets = data;

  // console.log(alltickets)

  return (
    <div>
      <h1 className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">Manage Tickets</h1>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members" className="min-w-150">

            <Table.Header>
              <Table.Column isRowHeader>#</Table.Column>
              <Table.Column>Photo</Table.Column>
              <Table.Column>Name</Table.Column>
              <Table.Column>From</Table.Column>
              <Table.Column>To</Table.Column>
              <Table.Column>Transport Type</Table.Column>
              <Table.Column>Price</Table.Column>
              <Table.Column>Quantity</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>

            <Table.Body>

              {
                alltickets.map((ticket, i) => <Table.Row key={i}>
                  <Table.Cell> {i + 1} </Table.Cell>
                  <Table.Cell> <div className='w-12 h-12 bg-cover rounded-sm p-1' style={{ backgroundImage: `url(${ticket.image_url})` }}></div> </Table.Cell>
                  <Table.Cell> {ticket.ticket_title} </Table.Cell>
                  <Table.Cell> {ticket.from_location} </Table.Cell>
                  <Table.Cell> {ticket.to_location} </Table.Cell>
                  <Table.Cell> {ticket.transport_type} </Table.Cell>
                  <Table.Cell> {ticket.price} </Table.Cell>
                  <Table.Cell> {ticket.ticket_quantity} </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-3">
                      <AdvertiseButton data={ticket} ></AdvertiseButton>
                    </div>
                  </Table.Cell>
                </Table.Row>)
              }


            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default AdvertiseTicketPage;
