import { DataTableDemo } from "@/components/data-table";
import React from "react";

const ManageAccounts: React.FC = () => {
  return (
    <div className="p-5">
      <h1 className="text-xl px-1.5 border-l-4 leading-6 border-primary font-bold mb-4">
        Manage Students
      </h1>

      <div>
        <DataTableDemo />
      </div>
    </div>
  );
};

export default ManageAccounts;
