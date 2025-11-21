import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ColorSelector from './components/ColorSelector';
import ResultDisplay from './components/ResultDisplay';
import { BACKGROUND_OPTIONS } from './constants';
import { swapBackground } from './services/geminiService';
import { AppState, BackgroundOption } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    image: null,
    imageBase64: null,
    processedImageBase64: null,
    isProcessing: false,
    error: null,
    selectedOptionId: null
  });

  const [customColor, setCustomColor] = useState<string | null>(null);

  const handleImageSelect = useCallback((file: File, base64: string) => {
    setState(prev => ({
      ...prev,
      image: file,
      imageBase64: base64,
      processedImageBase64: null,
      selectedOptionId: null,
      error: null
    }));
    setCustomColor(null);
  }, []);

  const handleReset = useCallback(() => {
    setState({
      image: null,
      imageBase64: null,
      processedImageBase64: null,
      isProcessing: false,
      error: null,
      selectedOptionId: null
    });
    setCustomColor(null);
  }, []);

  const processImageWithOption = async (option: BackgroundOption) => {
    if (!state.imageBase64 || !state.image) return;

    setState(prev => ({ ...prev, isProcessing: true, error: null }));

    try {
      const result = await swapBackground(state.imageBase64, state.image.type, option);
      setState(prev => ({ ...prev, processedImageBase64: result, isProcessing: false }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isProcessing: false, 
        error: err.message || "Failed to process image. Please try again." 
      }));
    }
  };

  const handleColorSelect = useCallback(async (id: string) => {
    if (!state.imageBase64 || !state.image) return;

    // Handle Custom Color Picker logic
    if (id === 'custom') {
      if (!('EyeDropper' in window)) {
        alert('Your browser does not support the EyeDropper API. Please use a browser like Chrome or Edge.');
        return;
      }

      try {
        // @ts-ignore - EyeDropper is not yet in standard lib dom types
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        const hexColor = result.sRGBHex;

        setCustomColor(hexColor);
        setState(prev => ({ ...prev, selectedOptionId: id }));

        // Create a dynamic option for the custom color
        const customOption: BackgroundOption = {
          id: 'custom',
          label: 'Custom Color',
          value: hexColor,
          type: BACKGROUND_OPTIONS.find(o => o.id === 'custom')!.type,
          className: ''
        };

        await processImageWithOption(customOption);
      } catch (e) {
        // User likely cancelled the picker
        console.log('EyeDropper cancelled or failed', e);
      }
      return;
    }

    // Handle Standard Options
    const option = BACKGROUND_OPTIONS.find(opt => opt.id === id);
    if (!option) return;

    setCustomColor(null); // Reset custom color if picking a preset
    setState(prev => ({ ...prev, selectedOptionId: id }));
    await processImageWithOption(option);

  }, [state.imageBase64, state.image]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {!state.imageBase64 ? (
          // Initial State: Upload
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                Professional Backgrounds, Instantly
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload your photo and let our AI seamlessly replace the background. Perfect for ID photos, products, and profiles.
              </p>
            </div>
            <ImageUploader onImageSelect={handleImageSelect} />
          </div>
        ) : (
          // Editor State
          <div className="animate-fade-in-up">
             <div className="mb-8 flex flex-col sm:flex-row justify-between items-end gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Edit Background</h2>
                <p className="text-gray-500 mt-1">Choose a color below to apply changes.</p>
              </div>
             </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
              <ColorSelector 
                selectedId={state.selectedOptionId} 
                onSelect={handleColorSelect} 
                disabled={state.isProcessing} 
                customColor={customColor}
              />
            </div>

            {state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-700 flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-medium">Generation Error</h4>
                  <p className="text-sm mt-1">{state.error}</p>
                </div>
              </div>
            )}

            <ResultDisplay 
              original={state.imageBase64} 
              result={state.processedImageBase64} 
              isProcessing={state.isProcessing}
              onReset={handleReset}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;