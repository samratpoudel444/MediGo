import React from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import axiosInstance from "../utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";


const SendMessage = ({userId}) => {
      const [message, setMessage] = useState("");
    if(!userId) return null;

    const sendMessage= async()=>
    {
        try{
            const response = await axiosInstance.post(`api/v1/sendMessage/${userId}`,
                content:
            );
            return response.data;
        }
        catch(err)
        {
            console.log(err);
            return err.response.data;
        }
    }

    const mutation= useMutation({
        mutationFn:sendMessage,
        onSuccess:(data)=>
        {
            console.log(success)
        },
        onError:(err)=>
        {
            console.log(err);
        }
    })

    const handleSubmit= (e)=>
    {
        e.preventDefault();
        
    }

  return (
    <div className="flex items-center gap-2 w-full h-full">
      <Input
        fullWidth
        placeholder="Type your message..."
        disableUnderline
        className="border border-gray-300 rounded px-3 py-2 bg-white"
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="contained" color="primary">
        {mutation.isPending ? "Sending..." : "Send"}
      </Button>
    </div>
  );
};

export default SendMessage;
