import { createContext, useContext, useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useAuth } from "./AuthContext";

const ChatSocketContext = createContext(null);

export const ChatSocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const stompClientRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
      setMessages([]);
      setConnected(false);
      return;
    }

    // Set up STOMP over SockJS
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log("STOMP debug: ", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      setConnected(true);
      
      // Subscribe to messages topic
      client.subscribe("/topic/messages", (messageOutput) => {
        try {
          const body = JSON.parse(messageOutput.body);
          setMessages((prev) => [...prev, body]);
        } catch (e) {
          console.error("Failed to parse STOMP message:", e);
        }
      });
    };

    client.onDisconnect = () => {
      setConnected(false);
    };

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [isAuthenticated, user]);

  const sendMessage = (receiver, content) => {
    if (stompClientRef.current && connected) {
      const payload = {
        sender: user?.username || "customer",
        receiver: receiver || "agent",
        content: content,
        timestamp: new Date().toISOString(),
      };
      
      stompClientRef.current.publish({
        destination: "/app/chat",
        body: JSON.stringify(payload),
      });
    }
  };

  const value = {
    messages,
    connected,
    sendMessage,
  };

  return (
    <ChatSocketContext.Provider value={value}>
      {children}
    </ChatSocketContext.Provider>
  );
};

export const useChatSocket = () => {
  const context = useContext(ChatSocketContext);
  if (!context) {
    throw new Error("useChatSocket must be used within a ChatSocketProvider");
  }
  return context;
};

export default ChatSocketContext;
