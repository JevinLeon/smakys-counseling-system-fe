import { DataTable } from "@/components/DataTable";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import PageTitle from "@/components/PageTitle";
import TableActions from "@/components/TableActions";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <TableActions
          editHref={`/users/${row.original.id}`}
          deleteFunc={() => console.log("deleted")}
        />
      );
    },
  },
];

// const data = [
//   { id: "1", name: "User 1", username: "user1", role: "admin" },
//   { id: "2", name: "User 2", username: "user2", role: "admin" },
//   { id: "3", name: "Superadmin", username: "superadmin", role: "superadmin" },
// ];

const UsersPage = () => {
  const [data, setData] = useState([]);

  const getUsers = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/users`
    );
    const { data } = res.data;
    setData(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Users" />
        <Button asChild>
          <Link to="/users/new">Add User</Link>
        </Button>
      </div>
      <div className="my-4 space-y-4">
        <DataTable columns={columns} data={data} />

        {/* {!isLoading && manufs && manufs.length == 0 && "No Result Found."} */}
        {/* {!isLoading && manufs && <DataTable columns={columns} data={manufs} />} */}
        {/* {isLoading && !users && (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        )} */}
      </div>
    </div>
  );
};

export default UsersPage;
