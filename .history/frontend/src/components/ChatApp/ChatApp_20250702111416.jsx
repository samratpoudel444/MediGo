import React from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'
import MessageBar from './MessageBar'
MessageBar

const ChatApp = () => {
  return (
    <div>
      <div>
        <SideBar />
      </div>
      <div>
        <TopBar />
      </div>
    </div>
  );
}

export default ChatApp