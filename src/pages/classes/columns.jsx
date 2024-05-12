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
        to={`/classes/${row.getValue("id")}`}
        className="hover:underline underline-offset-1"
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <TableActions editHref={`/classes/${row.original.id}`} />;
    },
  },
];

export default columns;
