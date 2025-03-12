
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AiAssistantProps {
  className?: string;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "مرحباً! أنا مساعدك في تسجيل الشركة. كيف يمكنني مساعدتك في تسجيل شركتك الناشئة في الجزائر؟", isUser: false }
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
      let response = "أقوم بمعالجة طلبك. كيف يمكنني مساعدتك في تسجيل شركتك الناشئة في الجزائر؟";
      
      // Pattern matching for Algerian startup registration process
      const input = inputValue.toLowerCase();
      
      if (input.includes('وثائق') || input.includes('مستندات') || input.includes('أوراق')) {
        response = "لتسجيل شركة ناشئة في الجزائر، ستحتاج إلى: بطاقة الهوية الوطنية، شهادة حجز الاسم من المركز الوطني للسجل التجاري، عقد إيجار المقر، والقانون الأساسي للشركة. يجب أن تكون جميع المستندات بصيغة PDF ومصدقة عند الضرورة.";
      } 
      else if (input.includes('موعد') || input.includes('مدة') || input.includes('كم يستغرق')) {
        response = "تستغرق عملية تسجيل الشركات الناشئة في الجزائر عادة 7-14 يومًا. تستغرق شهادة السجل التجاري حوالي 24 ساعة، وتسجيل الضمان الاجتماعي 48 ساعة، والتسجيل الضريبي 24-48 ساعة. ينصح بإكمال خطوة واحدة كل 2-3 أيام للبقاء على المسار الصحيح.";
      } 
      else if (input.includes('دفع') || input.includes('تكلفة') || input.includes('رسوم') || input.includes('سعر')) {
        response = "تكاليف التسجيل في الجزائر تشمل: حجز الاسم (490 دج)، رسوم التوثيق (5000-20000 دج)، رسوم السجل التجاري (تختلف حسب رأس المال)، واشتراك كاسنوس السنوي (حوالي 32000 دج). يتراوح المجموع عادة بين 38000-50000 دج حسب الهيكل القانوني ورأس المال.";
      }
      else if (input.includes('قانوني') || input.includes('هيكل') || input.includes('ش.ذ.م.م') || input.includes('نوع الشركة')) {
        response = "للشركات الناشئة في الجزائر، شركة ذات مسؤولية محدودة (SARL) هي الخيار الأكثر شيوعًا. الحد الأدنى لرأس المال هو 100000 دج، والمسؤولية محدودة باستثمارك. تتطلب شركة المساهمة (SPA) حدًا أدنى لرأس المال قدره 1000000 دج. المؤسسة الفردية (EI) ليس لها حد أدنى لرأس المال لكنها لا توفر فصلاً بين الأصول الشخصية وأصول الشركة.";
      }
      else if (input.includes('سجل تجاري') || input.includes('المركز الوطني')) {
        response = "يتعامل المركز الوطني للسجل التجاري (CNRC) مع حجز اسم الشركة والتسجيل التجاري. تستغرق العملية حوالي 24 ساعة لحجز الاسم و24 ساعة أخرى للتسجيل التجاري. ستحتاج إلى تقديم القانون الأساسي الموثق وإثبات المقر.";
      }
      else if (input.includes('ضرائب') || input.includes('ضريبة') || input.includes('جبائي')) {
        response = "بعد التسجيل في السجل التجاري، يجب عليك التسجيل لدى مديرية الضرائب للحصول على رقم التعريف الضريبي (NIF). تستغرق هذه العملية 24-48 ساعة. ستحتاج إلى شهادة التسجيل التجاري وبطاقة الهوية والقانون الأساسي. كما ستحتاج إلى اختيار النظام الضريبي الخاص بك.";
      }
      else if (input.includes('كناس') || input.includes('كاسنوس') || input.includes('ضمان اجتماعي')) {
        response = "كصاحب عمل في الجزائر، يجب عليك التسجيل في كاسنوس (للمقاولين) في غضون 10 أيام من بدء نشاطك. الاشتراك السنوي حوالي 32000 دج. إذا كان لديك موظفون، يجب عليك أيضًا تسجيلهم في كناس في غضون 10 أيام من التوظيف.";
      }
      else if (input.includes('وسم الشركة الناشئة') || input.includes('صفة الشركة الناشئة')) {
        response = "بعد إكمال التسجيل الأساسي، يمكنك التقدم للحصول على 'وسم الشركة الناشئة' الذي يوفر مزايا ضريبية والوصول إلى التمويل. قدم طلبك إلى الوكالة الوطنية لترقية وتطوير الحظائر التكنولوجية (ANPT). ستحتاج إلى إظهار الجوانب المبتكرة لعملك.";
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
        aria-label="فتح المساعد الذكي"
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
              <h3 className="font-medium">مساعد تسجيل الشركات الناشئة</h3>
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
                placeholder="اسأل عن خطوات التسجيل..."
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
