import React, { useState, useEffect } from "react";
import { onSocketEvent, offSocketEvent } from "../services/socketService";

const MessageBar = ({ userId, socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      // Fetch initial messages from your API
    };

    fetchMessages();

    const handleNewMessage = (message) => {
      if (message.from === userId) {
        setMessages((prev) => [...prev, message]);
      }
    };

    onSocketEvent("new_message", handleNewMessage);

    return () => {
      offSocketEvent("new_message", handleNewMessage);
    };
  }, [userId]);

  return (
    <div className="message-container">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.from === userId ? "received" : "sent"}`}
        >
          <div className="message-content">{msg.content}</div>
          <div className="message-time">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageBar;
