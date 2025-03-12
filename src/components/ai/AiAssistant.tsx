
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AiAssistantProps {
  className?: string;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "Hello! I'm your registration assistant. How can I help you with your startup registration in Algeria?", isUser: false }
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
    
    // Simulate AI response with more detailed Algerian-specific answers
    setTimeout(() => {
      let response = "I'm processing your request. How else can I assist you with your startup registration in Algeria?";
      
      // Pattern matching for Algerian startup registration process
      const input = inputValue.toLowerCase();
      
      if (input.includes('document') || input.includes('papers') || input.includes('file')) {
        response = "For startup registration in Algeria, you'll need: National ID card, name reservation certificate from CNRC, lease contract for headquarters, and articles of association. All documents should be in PDF format and certified when required.";
      } 
      else if (input.includes('deadline') || input.includes('time') || input.includes('how long')) {
        response = "The complete startup registration process in Algeria typically takes 7-14 days. The CNRC certificate takes about 24 hours, CASNOS registration 48 hours, and tax registration 24-48 hours. It's recommended to complete one step every 2-3 days to stay on track.";
      } 
      else if (input.includes('payment') || input.includes('cost') || input.includes('fee') || input.includes('price')) {
        response = "Registration costs in Algeria include: Name reservation (490 DZD), notary fees (5,000-20,000 DZD), CNRC registration fee (varies by capital), and annual CASNOS subscription (approximately 32,000 DZD). The total typically ranges from 38,000-50,000 DZD depending on your legal structure and capital.";
      }
      else if (input.includes('legal') || input.includes('structure') || input.includes('sarl') || input.includes('company type')) {
        response = "For startups in Algeria, SARL (Limited Liability Company) is the most common choice. The minimum capital is 100,000 DZD, and liability is limited to your investment. SPA requires 1,000,000 DZD minimum capital. EI (Entreprise Individuelle) has no minimum capital but offers no separation between personal and business assets.";
      }
      else if (input.includes('cnrc') || input.includes('commercial register')) {
        response = "The CNRC (National Commercial Registry Center) handles company name reservation and commercial registration. The process takes approximately 24 hours for name reservation and another 24 hours for commercial registration. You'll need to submit your notarized articles of association and proof of headquarters.";
      }
      else if (input.includes('tax') || input.includes('impôt') || input.includes('fiscal')) {
        response = "After CNRC registration, you must register with the Tax Directorate (Direction des Impôts) to obtain your tax identification number (NIF). This process takes 24-48 hours. You'll need your commercial registration certificate, ID, and articles of association. You'll also need to choose your tax regime.";
      }
      else if (input.includes('cnas') || input.includes('casnos') || input.includes('social security')) {
        response = "As a business owner in Algeria, you must register with CASNOS (for entrepreneurs) within 10 days of starting your activity. The annual subscription is approximately 32,000 DZD. If you have employees, you must also register them with CNAS within 10 days of hiring.";
      }
      else if (input.includes('startup label') || input.includes('startup status')) {
        response = "After completing the basic registration, you can apply for the 'Startup Label' which offers tax benefits and access to funding. Submit your application to the National Agency for the Promotion and Development of Technology Parks (ANPT). You'll need to demonstrate innovative aspects of your business.";
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
              <h3 className="font-medium">Startup Registration Assistant</h3>
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
                placeholder="Ask about registration steps..."
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
