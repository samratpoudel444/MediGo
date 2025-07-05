//import { Input } from "@mui/base/Input";
import { useQuery } from "@tanstack/react-query";
import { getSocket } from "../utils/SocketInitialize.jsx";
import axiosInstance from "../utils/AxiosInstance.jsx";


const MessageBar = ({userId}) => {

   if (!userId) {
     return (
        <div className="text-2xl flex flex-row justify-center items-center h-full">
            Please Select a User from SideBar......
        </div>
     );
   }
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

    const {data={}}= useQuery({
        queryFn: getChatData,
        queryKey: ["chatMessages", userId],
        enabled: !!userId,
    })

    const messages = data?.messages || [];

 
  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`p-3 rounded-lg max-w-xs break-words ${
            msg.senderId === userId && msg || msg.recieverId === userId ? "bg-blue-200 ml-auto" : "bg-gray-200 mr-auto"
          }`}
        >
          <p className="text-base leading-snug">{msg.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageBar;
