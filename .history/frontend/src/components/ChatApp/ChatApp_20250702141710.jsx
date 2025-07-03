import React from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import MessageBar from "./MessageBar";
import SendMessage from "./SendMessage";

const ChatApp = () => {
  return (
    <div className="flex h-screen overflow-hidden">

      <div className="w-80 h-full fixed left-0 top-0 z-40 bg-white">
        <SideBar />
      </div>

      <div className="ml-80 flex flex-col flex-1 h-full">

        <div className="h-16  bg-white">
          <TopBar name="Samrat" />
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            <MessageBar />
          </div>


          <div className="h-20  bg-white p-4">
            <SendMessage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
