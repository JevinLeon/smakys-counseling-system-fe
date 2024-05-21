import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
  },
  {
    accessorKey: "activity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Logs" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.User.name}{" "}
        <Badge
          variant={
            row.original.activity == "created"
              ? "success"
              : row.original.activity == "deleted"
              ? "destructive"
              : "warning"
          }
        >
          {row.original.activity}
        </Badge>{" "}
        counseling with id {row.original.counselingId}#
        {row.original.Counseling.title}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
];

export default columns;
