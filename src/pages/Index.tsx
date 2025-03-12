
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-secondary/30 p-6">
      <div className="max-w-3xl w-full text-center animate-fade-in">
        <div className="mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <h1 className="text-4xl font-bold mb-6">Startup Registration Platform</h1>
          <p className="text-xl text-muted-foreground mb-8">
            A streamlined solution for registering your startup in the commercial registry.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-card p-8 mb-8 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Welcome to the Platform</h2>
          <p className="text-muted-foreground mb-6">
            Our registry helper simplifies the complex process of startup registration, guiding you through each step with clarity and precision.
          </p>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors button-hover"
          >
            Go to Dashboard
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center mt-6">
          <div className="bg-white rounded-xl shadow-subtle p-5 flex items-center max-w-xs">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-medium">Simple Process</h3>
              <p className="text-sm text-muted-foreground">Guided step-by-step registration</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-subtle p-5 flex items-center max-w-xs">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-medium">AI Assistance</h3>
              <p className="text-sm text-muted-foreground">Get help at every step</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
