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
    <div className="surface-card flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border/70 bg-primary/5 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="material-symbols-outlined text-lg">chat</span>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Trip Assistant</h3>
            <p className="text-xs text-muted-foreground">Online • Ready to help</p>
          </div>
        </div>
        <button className="rounded-lg p-2 transition-colors hover:bg-surface-muted">
          <span className="material-symbols-outlined text-sm text-muted-foreground">info</span>
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-xl ${
                message.sender === 'user'
                  ? 'rounded-br-none bg-primary text-primary-foreground'
                  : 'rounded-bl-none border border-border bg-surface-elevated text-foreground'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-xl rounded-bl-none border border-border bg-surface-elevated px-4 py-3 text-foreground">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm animate-spin">autorenew</span>
                <p className="text-sm">AI is typing...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="border-t border-border/70 bg-surface/70 p-4 backdrop-blur-sm">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about your trip..."
            className="input-field flex-1"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="btn-primary px-4 py-3 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </div>
      </form>
    </div>
  );
}
 