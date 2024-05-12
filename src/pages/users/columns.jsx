import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import TableActions from "@/components/TableActions";
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
    cell: ({ row }) => (
      <Link
        to={`/users/${row.getValue("id")}`}
        className="hover:underline underline-offset-1"
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <Link
        to={`/users/${row.getValue("id")}`}
        className="hover:underline underline-offset-1"
      >
        {row.getValue("username")}
      </Link>
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
      return <TableActions editHref={`/users/${row.original.id}`} />;
    },
  },
];

export default columns;
