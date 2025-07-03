//import { Input } from "@mui/base/Input";

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
          <p className="text-sm">{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageBar;
