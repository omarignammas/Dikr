import React, { useState } from 'react';


// Mock Stepper components for demonstration
const Stepper = ({ children, initialStep = 1, onStepChange, onFinalStepCompleted, backButtonText, nextButtonText }) => {
  const [currentStep, setCurrentStep] = useState(initialStep - 1);
  const steps = React.Children.toArray(children);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      onStepChange && onStepChange(newStep + 1);
    } else {
      onFinalStepCompleted && onFinalStepCompleted();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      onStepChange && onStepChange(newStep + 1);
    }
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
    onStepChange && onStepChange(stepIndex + 1);
  };

  return (
    <div className="stepper-container">
      {/* Progress indicators */}
      <div className="flex justify-center mb-6 space-x-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentStep 
                ? 'w-8 bg-[#ff5d41]' 
                : index < currentStep 
                  ? 'w-2 bg-[#489dd2r]' 
                  : 'w-2 bg-gray-300'
            }`}
            onClick={() => goToStep(index)}
          />
        ))}
      </div>
      
      {/* Step content */}
      <div className="step-content">
        {React.cloneElement(steps[currentStep], { 
          onNext: nextStep, 
          onPrev: prevStep,
          canGoNext: currentStep < steps.length - 1,
          canGoPrev: currentStep > 0,
          isLastStep: currentStep === steps.length - 1,
          backButtonText,
          nextButtonText
        })}
      </div>
    </div>
  );
};
export default Stepper ;