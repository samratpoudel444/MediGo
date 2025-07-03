
const messages = [
  { id: 1, sender: "Emily", text: "Hey, how are you?" },
  { id: 2, sender: "You", text: "I'm good! You?" },
  { id: 3, sender: "Emily", text: "All good. Let's catch up soon." },
];

const SendMessage=()=>
{
    return (
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <MessageBar /> // or SendMessage in your example
        </div>
        <div className="h-20 border-t bg-white p-4">
          <SendMessage />
        </div>
      </div>
    );
}


export default SendMessage;