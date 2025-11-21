import { BackgroundOption, ColorType } from './types';

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  {
    id: 'transparent',
    label: 'Transparent',
    value: 'transparent',
    type: ColorType.TRANSPARENT,
    className: 'bg-checkerboard'
  },
  {
    id: 'white',
    label: 'White',
    value: '#FFFFFF',
    type: ColorType.SOLID,
    className: 'bg-white border border-gray-200'
  },
  {
    id: 'id-blue',
    label: 'ID Blue',
    value: '#0099FF',
    type: ColorType.SOLID,
    className: 'bg-[#0099FF]'
  },
  {
    id: 'red',
    label: 'Red',
    value: '#FF0000',
    type: ColorType.SOLID,
    className: 'bg-red-600'
  },
  {
    id: 'grey',
    label: 'Grey',
    value: '#808080',
    type: ColorType.SOLID,
    className: 'bg-gray-500'
  },
  {
    id: 'black',
    label: 'Black',
    value: '#000000',
    type: ColorType.SOLID,
    className: 'bg-black'
  },
  {
    id: 'custom',
    label: 'Custom',
    value: 'PICKER', // Placeholder, handled dynamically in App.tsx
    type: ColorType.SOLID,
    className: 'bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-red-500 via-purple-500 to-blue-500'
  }
];

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-image';