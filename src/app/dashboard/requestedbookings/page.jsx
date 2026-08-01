import ApproveButton from "@/components/Dashboard/ApproveButton";
import DeleteButton from "@/components/Dashboard/DeleteButton";
import RejectButton from "@/components/Dashboard/RejectButton";
import { auth } from "@/lib/auth";
import { FileText, PencilToSquare, TrashBin } from "@gravity-ui/icons";
import { Button, Chip, Table } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";

const RequestedBookings = async () => {

  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  });

  const user = session?.user;

  console.log(user)

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allbookings?vendor_email=${user.email}`,
    {
      cache: "no-store",
    });
  // const res = await fetch("http://localhost:5000/alltickets");
  const data = await res.json();
  const alltickets = data;

  // console.log(alltickets)

  return (
    <div>
      <h1 className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">
        Requested Booking
      </h1>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members" className="min-w-150">
            <Table.Header>
              <Table.Column isRowHeader>#</Table.Column>
              <Table.Column>Photo</Table.Column>
              <Table.Column>Name</Table.Column>
              <Table.Column>From</Table.Column>
              <Table.Column>To</Table.Column>
              <Table.Column>User Email</Table.Column>
              <Table.Column>Price</Table.Column>
              <Table.Column>Quantity</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>

            <Table.Body>
              {alltickets.map((ticket, i) => (
                <Table.Row key={i}>
                  <Table.Cell> {i + 1} </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <div
                      className="w-12 h-12 bg-cover rounded-sm p-1"
                      style={{ backgroundImage: `url(${ticket.image_url})` }}
                    ></div>{" "}
                  </Table.Cell>
                  <Table.Cell> {ticket.ticket_title} </Table.Cell>
                  <Table.Cell> {ticket.from_location} </Table.Cell>
                  <Table.Cell> {ticket.to_location} </Table.Cell>
                  <Table.Cell> {ticket.user_email} </Table.Cell>
                  <Table.Cell> {ticket.total_price} </Table.Cell>
                  <Table.Cell> {ticket.booking_quantity} </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-3">
                      {/* {ticket.status == 'approved' ? <Chip color="success" className="w-22.5">Approved</Chip> : <ApproveButton id={ticket._id} endpoint={'booking'} ></ApproveButton>} */}

                      <div className="flex gap-3">
                        {
                          ticket.status === "approved" ? (
                            <Chip color="success" className="w-22.5">
                              Approved
                            </Chip>
                          ) : ticket.status === "rejected" ? (
                            <Chip color="danger" className="w-22.5">
                              Rejected
                            </Chip>
                          ) : (
                            <ApproveButton id={ticket._id} endpoint="booking" />
                          )
                        }
                        {ticket.status == 'pending' ? <RejectButton id={ticket._id} endpoint={'booking'}></RejectButton> : <DeleteButton deleteData={ticket} endpoint={'deletebooking'} text={'Delete'} ></DeleteButton>}
                      </div>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default RequestedBookings;
