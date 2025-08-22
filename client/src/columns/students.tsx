import { Button } from "@/components/ui/button";
import type { StudentData } from "@/types/data.types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";

export const studentColumns: (
  editFn: (student: StudentData) => Promise<void>,
  deleteFn: (student: StudentData) => Promise<void>
) => ColumnDef<StudentData>[] = (editFn, deleteFn) => [
  {
    header: "No.",
    id: "serialNumber",
    cell: (props) => {
      const { pageIndex, pageSize } = props.table.getState().pagination;
      return (pageIndex * pageSize + props.row.index + 1).toString() + ".";
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full text-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center ">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "department",
    header: () => <div className="w-auto text-center">Department</div>,
    cell: ({ row }) => (
      <div className="text-center ">{row.getValue("department")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div className="">{row.getValue("address")}</div>,
  },
  {
    accessorKey: "guardian",
    header: "Parent / Guardian",
    cell: ({ row }) => <div className="">{row.getValue("guardian")}</div>,
  },
  {
    accessorKey: "phone",
    header: () => <div className="w-auto text-center">Phone #</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("phone")}</div>
    ),
  },
  {
    id: "action",
    header: () => <div className="w-auto text-center">Action</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original;

      return (
        <div className="flex items-center justify-center gap-1">
          <Button
            size="sm"
            className="cursor-pointer"
            onClick={() => editFn(student)}
          >
            <Edit />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="cursor-pointer"
            onClick={() => deleteFn(student)}
          >
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
