import React, { type ReactNode } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { useMainStore } from "./store";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const loggedIn = useMainStore((state) => state.loggedIn);

  if (!loggedIn) {
    return <div className="w-full h-dvh">{children}</div>;
  }

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
