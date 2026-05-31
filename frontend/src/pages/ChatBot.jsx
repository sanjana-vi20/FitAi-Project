import React, { useState } from "react";
import { MessageSquare, X, Send, Bot, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../config/API";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "System Online. Main aapki kya help kar sakta hoon?" },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input; // Input clear karne se pehle save kar lein
    setInput("");
    setLoading(true);
    try {
      const res = await api.post(import.meta.env.VITE_CHATBOT_RESPONSE, {
        promp: currentInput,
      });
      const botReply = res?.data?.reply || res?.data;

      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
    setInput("");
  };

  return (
    <div className="fixed bottom-10 right-10 z-[999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] h-[450px] bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 bg-lime-400 flex justify-between items-center">
              <div className="flex items-center gap-2 text-black">
                <Bot size={20} strokeWidth={3} />
                <span className="font-black uppercase tracking-tighter text-sm italic">
                  FitAI Assistant
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black/50 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium ${
                      msg.role === "user"
                        ? "bg-lime-400 text-black rounded-tr-none"
                        : "bg-slate-800 text-slate-200 border border-white/5 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Field */}
            <div className="p-4 border-t border-white/5 bg-black/20 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-slate-800/50 border border-white/5 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-lime-400/50 transition-all"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="p-2 bg-lime-400 text-black rounded-xl hover:scale-105 transition-transform"
              >
                <Send size={16} strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? "bg-white text-black rotate-90" : "bg-lime-400 text-black"
        }`}
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <div className="relative">
            <MessageSquare size={28} fill="black" />
            <Sparkles
              size={14}
              className="absolute -top-2 -right-2 text-black animate-pulse"
            />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatBot;
