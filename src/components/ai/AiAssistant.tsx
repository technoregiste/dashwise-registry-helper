
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AiAssistantProps {
  className?: string;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "Hello! I'm your registration assistant. How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { text: inputValue, isUser: true }]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      let response = "I'm processing your request. How else can I assist you?";
      
      // Simple pattern matching for demo purposes
      if (inputValue.toLowerCase().includes('document')) {
        response = "For document uploads, you'll need your business registration certificate, founder IDs, and proof of address. These should be in PDF format.";
      } else if (inputValue.toLowerCase().includes('deadline')) {
        response = "Your registration deadline is in 14 days. I recommend completing at least one step every 2-3 days to stay on track.";
      } else if (inputValue.toLowerCase().includes('payment')) {
        response = "Payment is the second-to-last step. You can pay via credit card, bank transfer, or digital wallet. The registration fee depends on your company type.";
      }
      
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full",
          "bg-primary text-white shadow-floating ai-assistant-button",
          "flex items-center justify-center",
          !isOpen && "animate-pulse-light",
          className
        )}
        aria-label="Open AI Assistant"
      >
        <MessageSquare size={24} />
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] h-[500px] rounded-2xl bg-white shadow-floating overflow-hidden flex flex-col animate-slide-in-right">
          {/* Header */}
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare size={20} className="mr-2" />
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={cn(
                  "max-w-[80%] p-3 rounded-xl",
                  message.isUser 
                    ? "bg-primary text-white ml-auto rounded-tr-none" 
                    : "bg-secondary text-foreground rounded-tl-none"
                )}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary resize-none max-h-24"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
                className={cn(
                  "p-3 rounded-r-lg",
                  "bg-primary text-white",
                  inputValue.trim() === '' && "opacity-50 cursor-not-allowed"
                )}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
