import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Namaskara! Naanu Naada Vedike AI. Enu sahaya beku ri?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input,
        config: {
          systemInstruction: "You are a helpful assistant for Naada Vedike, a cultural platform for North Karnataka. Speak in a friendly North Karnataka Kannada style (using words like 'ri', 'enu', 'beku', 'hogonri'). Help users with song recommendations, heritage info, and startup details.",
        }
      });

      const botMsg = { text: response.text || "Kshamisi, nange artha agalilla.", isBot: true };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Error connecting to AI.", isBot: true }]);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-80 h-96 flex flex-col overflow-hidden border border-gold/30 mb-4"
          >
            <div className="bg-deep-red text-gold p-4 flex justify-between items-center">
              <span className="font-bold">Naada Vedike AI</span>
              <X size={20} className="cursor-pointer" onClick={() => setIsOpen(false)} />
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-sand/20">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-white text-deep-red shadow-sm' : 'bg-deep-red text-white'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type here..."
                className="flex-1 p-2 border rounded-full text-sm focus:outline-none focus:border-gold"
              />
              <button onClick={handleSend} className="bg-deep-red text-gold p-2 rounded-full">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-deep-red text-gold p-4 rounded-full shadow-xl hover:scale-110 transition active:scale-95"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}
