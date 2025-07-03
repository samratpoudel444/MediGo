import React from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'
import MessageBar from './MessageBar'
import SendMessage from './SendMessage'


const ChatApp = () => {
  return (
    <div>
      <div className="fixed w-80 h-screen border">
        <SideBar />
      </div>
      <div className="flex flex-col fixed border ml-80 w-full h-screen">
        <TopBar />
      </div>
      <div className=" w-full h-full">
        <MessageBar />
      </div>
      <div className="border w-full h-20">
        <SendMessage />
      </div>
    </div>
  );
}

export default ChatApp