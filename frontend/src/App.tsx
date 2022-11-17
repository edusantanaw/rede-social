import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io();

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
  }, []);

  return <div></div>;
}

export default App;
