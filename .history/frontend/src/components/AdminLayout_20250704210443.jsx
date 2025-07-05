// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import ChatButton from "./ChatApp/ChatButton";


function AdminLayout() {
  return (
    <div className="flex flex-row">
      <div className="fixed">
        <SideBar />
        <ChatButton />
      </div>
      <div className="lg:ml-80 w-[98vw]">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
