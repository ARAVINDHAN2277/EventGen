import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Download, Palette, Image } from 'lucide-react';
import { generateEventBackground, generateThemeVariations } from '../../utils/imageGenerator';

interface BackgroundGeneratorProps {
  eventType: string;
  currentTheme: any;
  onBackgroundSelect: (background: string) => void;
}

const BackgroundGenerator: React.FC<BackgroundGeneratorProps> = ({
  eventType,
  currentTheme,
  onBackgroundSelect
}) => {
  const [generatedBackgrounds, setGeneratedBackgrounds] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedBackground, setSelectedBackground] = useState<string>('');

  useEffect(() => {
    generateInitialBackgrounds();
  }, [eventType, currentTheme]);

  const generateInitialBackgrounds = async () => {
    setIsGenerating(true);
    try {
      const backgrounds = await Promise.all([
        generateEventBackground(eventType, currentTheme.name),
        generateEventBackground(eventType, currentTheme.name, 'elegant and sophisticated'),
        generateEventBackground(eventType, currentTheme.name, 'vibrant and energetic'),
        generateEventBackground(eventType, currentTheme.name, 'minimalist and clean')
      ]);
      setGeneratedBackgrounds(backgrounds);
    } catch (error) {
      console.error('Error generating backgrounds:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCustomBackground = async () => {
    if (!customPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const background = await generateEventBackground(eventType, currentTheme.name, customPrompt);
      setGeneratedBackgrounds(prev => [background, ...prev.slice(0, 3)]);
    } catch (error) {
      console.error('Error generating custom background:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackgroundSelect = (background: string) => {
    setSelectedBackground(background);
    onBackgroundSelect(background);
  };

  const gradientBackgrounds = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
          AI Background Generator
        </h3>
        <button
          onClick={generateInitialBackgrounds}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>Regenerate</span>
        </button>
      </div>

      {/* Custom Prompt */}
      <div className="bg-gray-50 rounded-xl p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Background Prompt
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="e.g., sunset beach scene with palm trees"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={generateCustomBackground}
            disabled={isGenerating || !customPrompt.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate
          </button>
        </div>
      </div>

      {/* AI Generated Backgrounds */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
          <Image className="w-4 h-4 mr-2" />
          AI Generated Backgrounds
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {isGenerating ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-video bg-gray-200 rounded-lg animate-pulse flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-gray-400 animate-pulse" />
              </div>
            ))
          ) : (
            generatedBackgrounds.map((background, index) => (
              <button
                key={index}
                onClick={() => handleBackgroundSelect(background)}
                className={`aspect-video rounded-lg border-2 transition-all hover:scale-105 ${
                  selectedBackground === background
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <img
                  src={background}
                  alt={`Generated background ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Gradient Backgrounds */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
          <Palette className="w-4 h-4 mr-2" />
          Gradient Backgrounds
        </h4>
        <div className="grid grid-cols-4 gap-3">
          {gradientBackgrounds.map((gradient, index) => (
            <button
              key={index}
              onClick={() => handleBackgroundSelect(gradient)}
              className={`aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
                selectedBackground === gradient
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              style={{ background: gradient }}
            />
          ))}
        </div>
      </div>

      {/* Solid Colors */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">Solid Colors</h4>
        <div className="grid grid-cols-8 gap-2">
          {[
            '#FFFFFF', '#F8FAFC', '#F1F5F9', '#E2E8F0',
            '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
            '#EF4444', '#EC4899', '#6366F1', '#14B8A6',
            '#000000', '#374151', '#6B7280', '#9CA3AF'
          ].map((color) => (
            <button
              key={color}
              onClick={() => handleBackgroundSelect(color)}
              className={`aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
                selectedBackground === color
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundGenerator;