import React, { useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your travel assistant. How can I help you plan your trip today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I received your message: "${inputValue}". How can I assist you further?`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-surface rounded-xl border border-outline-variant shadow-sm">
      <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between bg-primary-fixed/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-lg">chat</span>
          </div>
          <div>
            <h3 className="text-body-md font-h3 text-on-surface">Trip Assistant</h3>
            <p className="text-xs text-on-surface-variant">Online • Ready to help</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
          <span className="material-symbols-outlined text-outline text-sm">info</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-xl ${
                message.sender === 'user'
                  ? 'bg-primary text-on-primary rounded-br-none'
                  : 'bg-surface-container-low text-on-surface rounded-bl-none border border-outline-variant/50'
              }`}
            >
              <p className="text-body-sm leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-on-primary/70' : 'text-on-surface-variant'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface-container-low text-on-surface rounded-xl rounded-bl-none px-4 py-3 border border-outline-variant/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm animate-spin">autorenew</span>
                <p className="text-body-sm">AI is typing...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-outline-variant/30 bg-white/50 backdrop-blur-sm">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about your trip..."
            className="flex-1 px-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-body-md"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-4 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-button text-button flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </div>
      </form>
    </div>
  );
}
 