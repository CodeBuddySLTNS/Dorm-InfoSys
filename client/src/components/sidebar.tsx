import { Home, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [page, setPage] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setPage("home");
        break;
      case "/students":
        setPage("students");
        break;
    }
  }, [location.pathname]);

  return (
    <div className="shadow-lg bg-[#fafafa]">
      <div className="w-full h-30 p-3 [background-image:linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.65)),url('/img/cover.jpg')] bg-center bg-cover">
        <div>
          <img
            className="w-14 h-14 rounded-full shadow border-2 border-primary"
            src="/img/default-icon.png"
          />
          <h3 className="text-white text-xl">Administrator</h3>
        </div>
      </div>
      <nav>
        <Link
          to="/"
          className={`px-4 py-2 flex items-center gap-4 ${
            page === "home"
              ? "text-white bg-primary hover:text-gray-300"
              : "hover:text-primary"
          }`}
        >
          <Home size={20} /> Dashboard
        </Link>
        <Link
          to="/students"
          className={`px-4 py-2 flex items-center gap-4 ${
            page === "students"
              ? "text-white bg-primary hover:text-gray-300"
              : "hover:text-primary"
          }`}
        >
          <Users size={20} /> Manage Students
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
