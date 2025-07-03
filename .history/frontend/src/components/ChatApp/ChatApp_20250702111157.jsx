import React from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'


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