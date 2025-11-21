import React from 'react';
import { BACKGROUND_OPTIONS } from '../constants';
import { ColorType } from '../types';

interface ColorSelectorProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  disabled?: boolean;
  customColor: string | null;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ selectedId, onSelect, disabled, customColor }) => {
  return (
    <div className="w-full">
      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
        Choose Background
      </h4>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-y-6 gap-x-3">
        {BACKGROUND_OPTIONS.map((option) => {
          const isCustom = option.id === 'custom';
          const isSelected = selectedId === option.id;
          
          // Determine the background style for the button
          let bgStyle = {};
          let className = option.className;

          // If it's the custom button and we have a custom color selected, override the rainbow class
          if (isCustom && customColor) {
            className = 'border border-gray-200'; // Reset to simple border
            bgStyle = { backgroundColor: customColor };
          }

          // Determine the text to display below
          let displayValue = option.value;
          if (option.type === ColorType.TRANSPARENT) {
            displayValue = 'None';
          } else if (isCustom) {
            displayValue = customColor || 'Pick';
          }

          return (
            <div key={option.id} className="flex flex-col items-center gap-2">
              <button
                onClick={() => onSelect(option.id)}
                disabled={disabled}
                style={bgStyle}
                className={`
                  group relative w-full aspect-square rounded-full shadow-sm
                  transition-all duration-200 flex items-center justify-center
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}
                  ${className}
                  ${isSelected ? 'ring-4 ring-offset-2 ring-indigo-500' : 'ring-1 ring-gray-200'}
                `}
                title={isCustom ? "Pick a color from screen" : option.label}
                aria-label={`Select ${option.label} background`}
              >
                {/* Icon Overlay for Selected State or Custom Picker */}
                {isSelected && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${option.id === 'white' || option.id === 'transparent' || (isCustom && customColor === '#FFFFFF') ? 'text-gray-800' : 'text-white'}`}>
                      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.207 1.022l-7.5 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.939a.75.75 0 011.022-.207z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {isCustom && !isSelected && !customColor && (
                   <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5 shadow-sm">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 10-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25L12.75 9" />
                    </svg>
                   </div>
                )}
              </button>
              
              {/* Hex Value Label */}
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tight bg-gray-50 px-1.5 py-0.5 rounded">
                {displayValue}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Select a preset or use <strong>Custom</strong> to pick any color from your screen.
      </p>
    </div>
  );
};

export default ColorSelector;