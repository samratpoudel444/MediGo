

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const timer = setTimeout(() => {
      connectSocket();
    }, 500);

    return () => {
      clearTimeout(timer);
      disconnectSocket();
    };
  }
}, []);


export const disconnectSocket= ()=>
{
    if(socket)
    {
         socket.disconnect();
         socket = null;
    }
}


export const getSocket= ()=> socket;