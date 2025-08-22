import { studentColumns } from "@/columns/students";
import { DataTable } from "@/components/data-table";
import DeleteStudent from "@/components/delete-student";
import EditStudent from "@/components/edit-student";
import { coleAPI } from "@/lib/utils";
import type { StudentData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

interface OpenState {
  qrCode: { status: boolean; student: StudentData };
  edit: { status: boolean; student: StudentData };
  delete: { status: boolean; student: StudentData };
}

const ManageAccounts: React.FC = () => {
  const [open, setOpen] = useState<OpenState>({
    qrCode: { status: false, student: {} as StudentData },
    edit: { status: false, student: {} as StudentData },
    delete: { status: false, student: {} as StudentData },
  });

  const { data: students } = useQuery<StudentData[]>({
    queryKey: ["students"],
    queryFn: coleAPI("/students"),
  });

  const editFn = async (student: StudentData) => {
    setOpen((prev) => ({ ...prev, edit: { status: true, student } }));
  };

  const deleteFn = async (student: StudentData) => {
    setOpen((prev) => ({ ...prev, delete: { status: true, student } }));
  };

  return (
    <div className="p-5">
      <h1 className="text-xl px-1.5 border-l-4 leading-6 border-primary font-bold mb-4">
        Manage Students
      </h1>

      <DataTable
        data={students || ([] as StudentData[])}
        columns={studentColumns(editFn, deleteFn)}
      />

      <EditStudent
        isOpen={open.edit.status}
        student={open.edit.student}
        close={() =>
          setOpen((prev) => ({
            ...prev,
            edit: { status: false, student: {} as StudentData },
          }))
        }
      />

      <DeleteStudent
        isOpen={open.delete.status}
        student={open.delete.student}
        close={() =>
          setOpen((prev) => ({
            ...prev,
            delete: { status: false, student: {} as StudentData },
          }))
        }
      />
    </div>
  );
};

export default ManageAccounts;
