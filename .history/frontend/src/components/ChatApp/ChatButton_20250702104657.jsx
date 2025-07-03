import { Navigate, useNavigate } from "react-router-dom";

const ChatButton = () => {
    const navigate= useNavigate();
  return (
    <div className="fixed top-[80%] right-20 z-50">
      <button
        onClick={(navigate('/Chat')}
        className="text-white text-xl font-bold px-10 py-3 bg-green-500 animate-color-cycle transition-colors duration-1000 shadow-lg"
        style={{
          clipPath:
            "polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
        }}
      >
        Make Chat
      </button>
    </div>
  );
};

export default ChatButton;
