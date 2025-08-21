import React, { type ReactNode } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-dvh grid [grid-template-rows:auto_1fr]">
      <Header />
      <div className="grid [grid-template-columns:1fr_4fr]">
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
