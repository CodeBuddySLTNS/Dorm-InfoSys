import { Home, Users } from "lucide-react";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="shadow-lg bg-[#fafafa]">
      <div className="w-full h-30 p-3 [background-image:linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.65)),url('/img/cover.jpg')] bg-center bg-cover">
        <div>
          <img
            className="w-16 h-16 rounded-full shadow border-2 border-primary"
            src="/img/logo.png"
          />
          <h3 className="text-white text-xl">Administrator</h3>
        </div>
      </div>
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
