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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <Link
        to={`/counselings/${row.getValue("id")}`}
        className="hover:underline underline-offset-1"
      >
        {row.getValue("title")}
      </Link>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
  },
  {
    accessorKey: "counselingType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Counseling Type" />
    ),
  },
  {
    accessorKey: "arrivalType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Arrival Type" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "User.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Counselor" />
    ),
  },
  {
    accessorKey: "NISN",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Students NISN" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <TableActions
          editHref={`/counselings/${row.original.id}`}
          deleteFunc={() => console.log("deleted")}
        />
      );
    },
  },
];

export default columns;
