import { useState, useEffect, useRef } from "react";
import { apiService } from "../services/apiService";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I am EcomCatalog AI, your shopping assistant. Ask me about products, pricing, or checkout procedures!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Add user message
    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setSending(true);

    try {
      const data = await apiService.post("/chat", { message: text });
      const botMsg = { sender: "bot", text: data?.reply || "I am processing your query." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        sender: "bot",
        text: "⚠️ Sorry, I had trouble connecting to EcomCatalog AI services. Make sure the Spring Boot backend is active.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleQuickReply = (topic) => {
    handleSend(topic);
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Chat Bubble */}
      <button className="chatbot-bubble-btn" onClick={() => setIsOpen(!isOpen)} title="Chat with AI">
        <span className="bubble-icon">🤖</span>
        <span className="bubble-pulse"></span>
      </button>

      {/* Floating Chat Dialog */}
      {isOpen && (
        <div className="chatbot-dialog glass animate-fade-in">
          <div className="chatbot-dialog-header">
            <div className="bot-header-info">
              <span className="bot-avatar">🤖</span>
              <div>
                <h4>Catalog AI Bot</h4>
                <span className="bot-status">● Live</span>
              </div>
            </div>
            <button className="bot-close-btn" onClick={() => setIsOpen(false)}>
              &times;
            </button>
          </div>

          <div className="chatbot-dialog-messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-bubble-row ${m.sender === "user" ? "user-row" : "bot-row"}`}>
                {m.sender === "bot" && <span className="chat-avatar-inline">🤖</span>}
                <div className={`chat-bubble ${m.sender === "user" ? "user-bubble" : "bot-bubble"}`}>
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
            {sending && (
              <div className="chat-bubble-row bot-row">
                <span className="chat-avatar-inline">🤖</span>
                <div className="chat-bubble bot-bubble typing-bubble">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Option chips */}
          <div className="chat-quick-chips">
            <button onClick={() => handleQuickReply("Show Electronics")}>💻 Electronics</button>
            <button onClick={() => handleQuickReply("Show Winter Clothing")}>🧥 Clothing</button>
            <button onClick={() => handleQuickReply("List prices")}>💰 Prices</button>
            <button onClick={() => handleQuickReply("How to checkout")}>💳 Checkout</button>
          </div>

          <div className="chatbot-dialog-footer">
            <input
              type="text"
              placeholder="Ask EcomCatalog AI..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={sending}
            />
            <button className="btn-chat-send" onClick={() => handleSend()} disabled={sending || !inputValue.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
