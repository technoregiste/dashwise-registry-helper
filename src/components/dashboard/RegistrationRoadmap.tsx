
import React from 'react';
import { cn } from '@/lib/utils';
import { Lock, Check, MapPin } from 'lucide-react';
import { StepData } from '@/types/dashboard';
import StepsList from './StepsList';
import { toast } from '@/hooks/use-toast';

interface RegistrationRoadmapProps {
  steps: StepData[];
  onStepClick: (stepId: number) => void;
  className?: string;
}

const RegistrationRoadmap: React.FC<RegistrationRoadmapProps> = ({
  steps,
  onStepClick,
  className
}) => {
  const handleStepClick = (step: StepData) => {
    if (step.status === 'incomplete') {
      // Check if previous step is completed
      const prevStep = steps.find(s => s.id === step.id - 1);
      if (prevStep && prevStep.status !== 'complete') {
        toast({
          title: "⚠️ لا يمكن تخطي الخطوات",
          description: "يجب إكمال الخطوة السابقة أولاً للانتقال إلى هذه الخطوة!",
          variant: "destructive",
        });
        return;
      }
    }
    
    onStepClick(step.id);
  };

  // Find current active step
  const currentStep = steps.find(s => s.status === 'progress') || 
                     (steps.length > 0 ? steps[0] : null);

  return (
    <div className={cn("game-roadmap relative pb-8", className)}>
      <h2 className="text-2xl font-semibold mb-6 text-center">رحلة تسجيل شركتك</h2>
      
      {/* Background with path */}
      <div className="relative w-full overflow-hidden rounded-lg bg-gradient-to-br from-emerald-100 to-sky-100 p-4">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/c402325e-2f0e-4058-a18f-eb64fe1a3ce3.png')] bg-cover bg-center opacity-20"></div>
        
        {/* Path Background */}
        <div className="relative z-10">
          {/* Path SVG - Creates a winding path */}
          <svg className="absolute top-0 left-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M10,95 Q20,95 25,85 T40,75 T55,65 T70,60 T80,45 T90,20" 
              fill="none" 
              stroke="#f0d090" 
              strokeWidth="8" 
              strokeLinecap="round"
              className="opacity-70"
            />
          </svg>
          
          {/* Game Levels (Steps) */}
          <div className="relative z-10 min-h-[500px] py-10">
            <div className="flex flex-col items-center space-y-16">
              {steps.map((step, index) => {
                const isCompleted = step.status === 'complete';
                const isActive = step.status === 'progress';
                const isDisabled = !isActive && step.status === 'incomplete';
                const isPreviousComplete = index === 0 || steps[index - 1].status === 'complete';
                const isAccessible = isActive || isPreviousComplete;
                
                // Calculate position based on index for zigzag effect
                // Alternate between right and left for odd and even indexes
                const position = index % 2 === 0 
                  ? `mr-auto ml-4 md:ml-${8 + (index % 3) * 4}` 
                  : `ml-auto mr-4 md:mr-${8 + (index % 3) * 4}`;
                
                // Stars for completed steps
                const showStars = isCompleted;
                
                return (
                  <div 
                    key={step.id} 
                    className={cn(
                      "relative game-step animate-fade-in", 
                      position,
                      { "cursor-pointer": isAccessible },
                      { "cursor-not-allowed opacity-60": !isAccessible && isDisabled }
                    )}
                    style={{ animationDelay: `${index * 0.15}s` }}
                    onClick={() => isAccessible ? handleStepClick(step) : null}
                  >
                    {/* Level Circle */}
                    <div 
                      className={cn(
                        "relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg border-4 transition-all",
                        isCompleted ? "bg-blue-400 border-blue-500 text-white" :
                        isActive ? "bg-green-400 border-green-500 text-white animate-pulse" :
                        "bg-gray-300 border-gray-400 text-gray-600"
                      )}
                    >
                      {/* Step Number or icon */}
                      {isCompleted ? 
                        <Check className="w-8 h-8" /> : 
                        isDisabled && !isPreviousComplete ? 
                        <Lock className="w-6 h-6" /> : 
                        <span className="text-2xl font-bold">{step.id}</span>
                      }
                      
                      {/* Current step indicator */}
                      {isActive && (
                        <div className="absolute -top-1 -right-1">
                          <MapPin className="w-6 h-6 text-green-600 fill-green-400" />
                        </div>
                      )}
                      
                      {/* Stars - Showing completion rating */}
                      {showStars && (
                        <div className="absolute -bottom-6 flex space-x-1 rtl:space-x-reverse">
                          <span className="text-yellow-500 text-xl">⭐</span>
                          <span className="text-yellow-500 text-xl">⭐</span>
                          <span className="text-yellow-500 text-xl">⭐</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Tooltip with step information */}
                    <div className={cn(
                      "absolute top-full mt-8 w-60 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-xl border-2 z-20 transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible",
                      isActive || isCompleted ? "border-primary/30" : "border-gray-200",
                      index % 2 === 0 ? "left-0" : "right-0"
                    )}>
                      <h3 className="font-semibold text-base mb-1">{step.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{step.description.substring(0, 80)}...</p>
                      
                      {step.details?.steps && isActive && (
                        <div className="mt-2">
                          <StepsList steps={step.details.steps.slice(0, 2)} />
                          {step.details.steps.length > 2 && (
                            <p className="text-xs text-primary mt-1 text-center">+{step.details.steps.length - 2} خطوات إضافية</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Finish Flag */}
              {steps.length > 0 && steps.every(step => step.status === 'complete') && (
                <div className="relative animate-bounce mt-4">
                  <div className="text-3xl">🏁</div>
                  <div className="absolute top-full mt-2 font-bold text-green-600 whitespace-nowrap">تم إكمال جميع الخطوات!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Current step details card */}
      {currentStep && (
        <div className="bg-white rounded-lg shadow-md p-4 mt-6 border-2 border-primary/20 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">{currentStep.title}</h3>
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              currentStep.status === 'complete' ? "bg-blue-100 text-blue-700" :
              currentStep.status === 'progress' ? "bg-green-100 text-green-700" :
              "bg-gray-100 text-gray-600"
            )}>
              {currentStep.status === 'complete' ? 'مكتمل' : 
               currentStep.status === 'progress' ? 'قيد التنفيذ' : 
               'غير مكتمل'}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">{currentStep.description}</p>
          
          {currentStep.details?.steps && (
            <div className="mt-3 bg-gray-50 p-3 rounded-md">
              <h4 className="font-medium text-sm mb-2">الخطوات المطلوبة:</h4>
              <StepsList steps={currentStep.details.steps} />
            </div>
          )}
          
          <button 
            onClick={() => handleStepClick(currentStep)}
            className="w-full mt-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            {currentStep.status === 'complete' ? 'عرض التفاصيل' : 'إكمال الخطوة'}
          </button>
        </div>
      )}
    </div>
  );
};

export default RegistrationRoadmap;
