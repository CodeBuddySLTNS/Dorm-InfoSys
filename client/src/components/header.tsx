import { useMainStore } from "@/store";
import { LogOut, Menu } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    useMainStore.getState().setLoggedIn(false);
    useMainStore.getState().setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-primary shadow-lg">
      <div className="flex items-center">
        <div className="p-3 hidden min-[410px]:inline-block bg-[#42bccc]">
          <Menu className="text-white" />
        </div>
        <div className="flex items-center gap-1.5 p-1 px-2">
          <img className="w-[35px]" src="/img/logo.png" alt="logo" />
          <div className="text-white">
            <h1 className="leading-4.5 uppercase font-bold">
              Philippine Advent College{" "}
              <span className="hidden min-[360px]:inline-block">Inc.</span>
            </h1>
            <p className="leading-4.5 text-sm min-[360px]:text-base">
              Dormitory Information System
            </p>
          </div>
        </div>
      </div>
      <div
        className="text-sm flex items-center gap-1 p-1 mr-3 rounded bg-red-700 hover:bg-red-600 text-white cursor-pointer transition-colors duration-200"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span className="hidden md:inline-block">Logout</span>
      </div>
    </div>
  );
};

export default Header;
