import React, { type ReactNode } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { useMainStore } from "./store";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const loggedIn = useMainStore((state) => state.loggedIn);
  const user = useMainStore((state) => state.user);

  if (!loggedIn) {
    return <div className="w-full h-dvh">{children}</div>;
  }

  return (
    <div className="w-full h-dvh grid [grid-template-rows:auto_1fr]">
      <Header />
      {user?.role === "admin" ? (
        <div className="grid [grid-template-columns:250px_1fr]">
          <Sidebar />
          <div>{children}</div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default Layout;
