import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((m) => [...m, userMessage]);

    try {

      // ✅ CALL YOUR FLASK BACKEND
      const res = await axios.post("http://localhost:5000/chat", {
        message: input
      });

      const botText = res.data.reply;

      setMessages((m) => [
        ...m,
        { role: "bot", text: botText }
      ]);

    } catch (err) {

      console.error(err);

      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "⚠ Server error. Make sure backend is running."
        }
      ]);

    }

    setInput("");

  };

  return (

    <div className="chatbot-container">

      <button
        className="chatbot-button"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {open && (

        <div className="chatbot-window">

          <div className="chatbot-header">
            AgriGrow AI Assistant 🌱
          </div>

          <div className="chatbot-messages">

            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === "user" ? "user-msg" : "bot-msg"}
              >
                {msg.text}
              </div>
            ))}

          </div>

          <div className="chatbot-input">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about crops..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button onClick={sendMessage}>
              Send
            </button>

          </div>

        </div>

      )}

    </div>

  );

};

export default Chatbot;