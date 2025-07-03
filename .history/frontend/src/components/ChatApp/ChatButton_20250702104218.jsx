const ChatButton= ()=>
{
    return (
      <div className="fixed top-[80%] right-20">
        <button className="rounded-xl bg-purple-400 px-5 py-3 text-xl font-bol text-white px-6 py-3 rounded-lg animate-color-cycle transition-colors duration-500 "
        style="clip-path: polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%);>
          Make Chat
        </button>
      </div>
    );
}

export default ChatButton;