import { Home, Users } from "lucide-react";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="shadow-lg">
      <div className="w-full h-30 []"></div>
      <nav className="list-none">
        <li className="px-4 py-2 flex items-center gap-4 hover:text-white hover:bg-primary">
          <Home size={20} /> Dashboard
        </li>
        <li className="px-4 py-2 flex items-center gap-4 hover:text-white hover:bg-primary">
          <Users size={20} /> Manage Accounts
        </li>
      </nav>
    </div>
  );
};

export default Sidebar;
