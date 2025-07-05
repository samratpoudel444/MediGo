//import { Input } from "@mui/base/Input";
import { useQuery } from "@tanstack/react-query";
import { getSocket } from "../utils/SocketInitialize.jsx";
import axiosInstance from "../utils/AxiosInstance.jsx";

const messages = [
  { id: 1, sender: "Emily", text: "Hey, how are you?" },
  { id: 2, sender: "You", text: "I'm good! You?" },
  { id: 3, sender: "Emily", text: "All good. Let's catch up soon." },

];

const MessageBar = ({userId}) => {

    const getChatData= async ()=>
    {
        try{
            const response= await axiosInstance.get(`api/v1/getAllMessage/${userId}`)
            return response.data
        }
        catch(err)
        {
            console.log(err)
            throw err;
        }
    }

    const {data= }= useQuery({
        queryFn: getChatData,
        queryKey: ["chatMessages"]
    })

    console.log(data)
  return (
    <div className="space-y-2">
      {data.map((msg) => (
        <div
          key={msg.id}
          className={`p-3 rounded-lg max-w-xs break-words ${
            msg.senderId === userId ? "bg-blue-200 ml-auto" : "bg-gray-200 mr-auto"
          }`}
        >
          <p className="text-base leading-snug">{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageBar;
