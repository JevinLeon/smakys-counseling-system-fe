import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import TableActions from "@/components/TableActions";

const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
  },
  {
    accessorKey: "NISN",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NISN" />
    ),
  },
  {
    accessorKey: "NIS",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIS" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "Class.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Class" />
    ),
  },
  {
    accessorKey: "phoneNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone no" />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
  },
  {
    accessorKey: "healthHistory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Health History" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date of Birth" />
    ),
  },
  {
    accessorKey: "placeOfBirth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Place of Birth" />
    ),
  },
  {
    accessorKey: "universityTarget",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="University Target" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "guardianName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guardian's Name" />
    ),
  },
  {
    accessorKey: "guardianJob",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guardian's Job" />
    ),
  },
  {
    accessorKey: "guardianPhoneNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guardian's Phone no" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <TableActions
          editHref={`/students/${row.original.id}`}
          deleteFunc={() => console.log("deleted")}
        />
      );
    },
  },
];

export default columns;
