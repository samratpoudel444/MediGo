import React from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import MessageBar from "./MessageBar";
import SendMessage from "./SendMessage";

const ChatApp = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 h-full border-r absolute left-0 top-0 z-40 bg-white">
        <SideBar />
      </div>

      {/* Main Chat Section */}
      <div className="ml-80 flex flex-col flex-1 h-full">
        {/* Top Bar */}
        <div className="h-16 border-b bg-white">
          <TopBar />
        </div>

        {/* Messages + Input */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <MessageBar />
          </div>

          {/* Send Message */}
          <div className="h-20 border-t bg-white p-4">
            <SendMessage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
