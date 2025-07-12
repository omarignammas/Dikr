import React from 'react';


const Step = ({ children, onNext, onPrev, canGoNext, canGoPrev, isLastStep, backButtonText, nextButtonText }) => {
  return (
    <div className="step">
      <div className="step-content-wrapper">
        {children}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        {canGoPrev && (
          <button
            onClick={onPrev}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {backButtonText || 'Previous'}
          </button>
        )}
        
        {canGoNext && (
          <button
            onClick={onNext}
            className="px-6 py-2 bg-[#e9514c] text-white rounded-lg hover:bg-[#fb6051] transition-colors ml-auto"
          >
            {isLastStep ? 'Complete' : (nextButtonText || 'Next')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Step ;