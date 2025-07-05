//import { Input } from "@mui/base/Input";
import { getSocket } from "../utils/SocketInitialize.jsx";

const messages = [
  { id: 1, sender: "Emily", text: "Hey, how are you?" },
  { id: 2, sender: "You", text: "I'm good! You?" },
  { id: 3, sender: "Emily", text: "All good. Let's catch up soon." },

];

const MessageBar = () => {
    
  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-3 rounded-lg max-w-xs break-words ${
            msg.sender === "You" ? "bg-blue-200 ml-auto" : "bg-gray-200 mr-auto"
          }`}
        >
          <p className="text-base leading-snug">{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageBar;
