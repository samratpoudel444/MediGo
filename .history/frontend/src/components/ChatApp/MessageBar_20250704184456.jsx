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
          className={`p-2 rounded max-w-xs ${
            msg.sender === "You" ? "bg-blue-200 ml-auto" : "bg-gray-200"
          }`}
        >
          <p className="text-xl">{msg.text}</p>
          <span className="text">{msg.sender === "You"? "you" :"dgds"}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageBar;
