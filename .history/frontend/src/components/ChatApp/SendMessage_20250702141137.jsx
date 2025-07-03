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
      <Button variant="contained" color="primary">
        Send
      </Button>
    </div>
  );
};

export default SendMessage;
