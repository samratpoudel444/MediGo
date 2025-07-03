import React from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'
import MessageBar from './MessageBar'
import SendMessage from './SendMessage'
SendMessage

const ChatApp = () => {
  return (
    <div>
      <div>
        <SideBar />
      </div>
      <div>
        <TopBar />
      </div>
      <div><MessageBar/></div>
      <div><SendMessage/></div>
    </div>
  );
}

export default ChatApp