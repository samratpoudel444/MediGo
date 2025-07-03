import { Input } from "@mui/base/Input";

const SendMessage = () => {
  return (
    <div>
      <Input
        fullWidth
        placeholder="Type your message..."
        disableUnderline
        className="border border-gray-300 rounded px-3 py-2"
      />
    </div>
  );
};

export default SendMessage;
