import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import TableActions from "@/components/TableActions";
import { Link } from "react-router-dom";

const columns = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <Link
        to={`/counselings/${row.original.id}`}
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
    cell: ({ row }) => (
      <div>
        {row.getValue("description") == "" ? "-" : row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("notes") == "" ? "-" : row.getValue("notes")}</div>
    ),
  },
  {
    accessorKey: "counselingType",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Counseling Component / Komponen Konseling"
      />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "arrivalType",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Arrival Type / Riwayat Kedatangan"
      />
    ),

    cell: ({ row }) => (
      <div>
        {row.getValue("arrivalType") == "called"
          ? "Called"
          : row.getValue("arrivalType") == "voluntary"
          ? "Voluntary"
          : "Referral"}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("status") == "pending" ? "Continued" : "Completed"}
      </div>
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
      return <TableActions editHref={`/counselings/${row.original.id}`} />;
    },
  },
];

export default columns;
