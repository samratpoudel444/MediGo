import React from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import axiosInstance from "../utils/AxiosInstance";

const SendMessage = ({userId}) => {

    if(!userId) return null;

    const sendMessage= async()=>
    {
        try{
            const response = await axiosInstance.post("api/v1/sendMessage");
        }
        catch(err)
        {

        }
    }

  return (
    <div className="flex items-center gap-2 w-full h-full">
      <Input
        fullWidth
        placeholder="Type your message..."
        disableUnderline
        className="border border-gray-300 rounded px-3 py-2 bg-white"
      />
      <Button variant="contained" color="primary">
        Send
      </Button>
    </div>
  );
};

export default SendMessage;
