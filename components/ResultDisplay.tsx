import React from 'react';
import Button from './Button';

interface ResultDisplayProps {
  original: string;
  result: string | null;
  isProcessing: boolean;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ original, result, isProcessing, onReset }) => {
  
  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = `processed_image_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Main Display Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Original Image */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col">
          <div className="mb-3 text-sm font-medium text-gray-500 flex justify-between items-center">
            <span>Original</span>
          </div>
          <div className="relative flex-1 bg-gray-50 rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center border border-gray-100">
            <img 
              src={original} 
              alt="Original upload" 
              className="max-h-[400px] w-full object-contain"
            />
          </div>
        </div>

        {/* Processed Image / Loading State */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col">
          <div className="mb-3 text-sm font-medium text-gray-500 flex justify-between items-center">
            <span>Result</span>
            {result && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Success
              </span>
            )}
          </div>
          
          <div className={`
            relative flex-1 rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center border border-gray-100
            ${!result && !isProcessing ? 'bg-gray-50' : 'bg-checkerboard'}
          `}>
            
            {isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
                <p className="text-gray-600 font-medium animate-pulse">Generating new background...</p>
                <p className="text-xs text-gray-400 mt-2">This may take a few seconds</p>
              </div>
            )}

            {!result && !isProcessing && (
              <div className="text-gray-400 text-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-2 opacity-50">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                <p>Select a color to see the magic</p>
              </div>
            )}

            {result && (
               <img 
               src={result} 
               alt="Processed Result" 
               className="max-h-[400px] w-full object-contain relative z-0"
             />
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4 border-t border-gray-100">
        <Button variant="outline" onClick={onReset} disabled={isProcessing}>
          Start Over
        </Button>
        <Button 
          variant="primary" 
          onClick={handleDownload} 
          disabled={!result || isProcessing}
          className="w-full sm:w-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download Image
        </Button>
      </div>
    </div>
  );
};

export default ResultDisplay;