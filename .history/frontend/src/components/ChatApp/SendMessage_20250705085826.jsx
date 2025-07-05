import React, { useState } from "react";
import { emitSocketEvent } from "../services/socketService";

const SendMessage = ({ userId, socket }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    emitSocketEvent("private_message", {
      to: userId,
      content: message,
    });

    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
