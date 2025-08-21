import { Menu } from "lucide-react";
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex items-center bg-primary shadow-lg">
      <div className="p-3 bg-[#42bccc]">
        <Menu className="text-white" />
      </div>
      <div className="flex items-center gap-1.5 p-1 px-2">
        <img className="w-[35px]" src="/img/logo.png" alt="logo" />
        <div className="text-white">
          <h1 className="leading-4.5 uppercase font-bold">
            Philippine Advent College Inc.
          </h1>
          <p className="leading-4.5">Dormitory Information System</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
