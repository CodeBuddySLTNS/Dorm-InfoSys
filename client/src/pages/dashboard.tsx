import { Users } from "lucide-react";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-5">
      <h1 className="text-xl px-1.5 border-l-4 leading-6 border-primary font-bold mb-4">
        Dashboard
      </h1>

      <div className="flex justify-between p-4 rounded-lg bg-linear-to-r from-teal-500 to-teal-300 relative shadow">
        <div>
          <h2 className="text-2xl text-white font-bold">Total Students</h2>
          <p className="text-sm text-gray-100">Dormitory InfoSys</p>
        </div>

        <Users
          className="text-[rgba(0,0,0,0.2)] absolute right-3 top-1/2 transform -translate-y-1/2"
          size={60}
        />

        <div className="text-4xl pr-10 text-white font-bold mt-2 z-10">150</div>
      </div>
    </div>
  );
};

export default Dashboard;
