const ChatButton = () => {
  return (
    <div className="fixed top-[80%] right-20 z-50">
      <button
        className="text-white text-xl font-bold px-6 py-3 bg-green-500 animate-color-cycle transition-colors duration-1000 shadow-lg"
        style={{
          clipPath: "polygon(0 , 90% 0, 100% 50%, 90% 100%, 0 100%)",
        }}
      >
        Make Chat
      </button>
    </div>
  );
};

export default ChatButton;
