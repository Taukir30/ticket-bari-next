import { auth } from "@/lib/auth";
import { FileText, PencilToSquare, TrashBin } from "@gravity-ui/icons";
import { Button, Table } from "@heroui/react";
import { headers } from "next/headers";

const TransactionHistoryPage = async () => {

  const userSession = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  });

  const user = userSession?.user;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payments?user_email=${user.email}`,
    {
      cache: "no-store",
    });
  // const res = await fetch("http://localhost:5000/allpayments");
  const data = await res.json();
  const allpayments = data;

  console.log(allpayments)

  return (
    <div>
      <h1 className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">My Transactions</h1>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members" className="min-w-150">
            <Table.Header>
              <Table.Column isRowHeader>#</Table.Column>

              <Table.Column>Name</Table.Column>
              <Table.Column>Amount</Table.Column>
              <Table.Column>Transaction ID</Table.Column>
              <Table.Column>Payment Date</Table.Column>

              <Table.Column>Action</Table.Column>
            </Table.Header>

            <Table.Body>
              {allpayments.map((payment, i) => (
                <Table.Row key={i}>
                  <Table.Cell> {i + 1} </Table.Cell>

                  <Table.Cell> {payment.ticket_title} </Table.Cell>
                  <Table.Cell> {payment.price} </Table.Cell>
                  <Table.Cell> {payment.transaction_id} </Table.Cell>
                  <Table.Cell> {new Date(payment.payment_date).toLocaleString("en-BD", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })} </Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-3">
                      <Button variant="secondary">
                        Details
                      </Button>
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

export default TransactionHistoryPage;
