import UserAction from "@/components/Dashboard/UserAction";
import { Table } from "@heroui/react";

const ManageUserPage = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`,
    {
      cache: "no-store",
    });
  // const res = await fetch("http://localhost:5000/allusers");
  const data = await res.json();

  const allusers = data;

  return (
    <div>
      <h1 className="mb-5 font-semibold text-neutral-600 dark:text-white text-2xl tracking-wide">User Management</h1>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members" className="min-w-150">

            <Table.Header>
              <Table.Column isRowHeader>#</Table.Column>
              <Table.Column>Photo</Table.Column>
              <Table.Column>Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>

            <Table.Body>

              {
                allusers.map((user, i) => <Table.Row key={i}>
                  <Table.Cell> {i + 1} </Table.Cell>
                  <Table.Cell> <div className='w-12 h-12 bg-cover rounded-sm p-1' style={{ backgroundImage: `url(${user.image})` }}></div> </Table.Cell>
                  <Table.Cell> {user.name} </Table.Cell>
                  <Table.Cell> {user.email} </Table.Cell>
                  <Table.Cell> {user.role} </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-3">
                      <UserAction user={user}></UserAction>
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

export default ManageUserPage;
