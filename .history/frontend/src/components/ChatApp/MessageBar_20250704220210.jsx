import React, { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import axiosInstance from "../utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

const SendMessage = ({ userId }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (messageContent) => {
    const response = await axiosInstance.post(`api/v1/sendMessage/${userId}`, {
      message: messageContent,
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      console.log(data);
      setMessage("");
    },
    onError: (err) => {
      console.error("Error sending message:", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && userId) {
      mutation.mutate(message.trim());
    }
  };

  if (!userId) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 w-full h-full">
        <Input
          fullWidth
          placeholder="Type your message..."
          disableUnderline
          className="border border-gray-300 rounded px-3 py-2 bg-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={mutation.isPending}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={mutation.isPending || !message.trim()}
        >
          {mutation.isPending ? "Sending..." : "Send"}
        </Button>
      </div>
    </form>
  );
};

export default SendMessage;
