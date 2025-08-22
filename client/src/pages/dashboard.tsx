import { coleAPI } from "@/lib/utils";
import type { StudentData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";
import { Loader, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { data: students } = useQuery<StudentData[]>({
    queryKey: ["students"],
    queryFn: coleAPI("/students"),
  });

  return (
    <div className="p-5">
      <h1 className="text-xl px-1.5 border-l-4 leading-6 border-primary font-bold mb-4">
        Dashboard
      </h1>

      <Link
        to="/students"
        className="flex justify-between p-4 rounded-lg bg-linear-to-r from-teal-500 to-teal-300 relative shadow"
      >
        <div>
          <h2 className="text-2xl text-white font-bold">Total Students</h2>
          <p className="text-sm text-gray-100">Dormitory InfoSys</p>
        </div>

        <Users
          className="text-[rgba(0,0,0,0.2)] absolute right-3 top-1/2 transform -translate-y-1/2"
          size={60}
        />

        <div className="text-4xl pr-10 text-white font-bold mt-2 z-10">
          {students?.length || (
            <Loader size={40} className="animate-spin text-white" />
          )}
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
