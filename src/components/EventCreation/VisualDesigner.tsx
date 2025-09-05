import React, { useState } from 'react';
import { Palette, Wand2, Layout, Download } from 'lucide-react';
import CanvasEditor from '../VisualEditor/CanvasEditor';
import BackgroundGenerator from '../VisualEditor/BackgroundGenerator';
import { useEvent } from '../../context/EventContext';
import { CanvasDesign } from '../../types';

interface VisualDesignerProps {
  onNext: () => void;
  onBack: () => void;
}

const VisualDesigner: React.FC<VisualDesignerProps> = ({ onNext, onBack }) => {
  const { currentEvent, updateEventData } = useEvent();
  const [activeTab, setActiveTab] = useState<'design' | 'background'>('design');
  const [canvasDesign, setCanvasDesign] = useState<CanvasDesign>({
    id: 'main_design',
    width: 800,
    height: 600,
    background: currentEvent.theme?.backgroundImage || '#FFFFFF',
    elements: [
      {
        id: 'title_text',
        type: 'text',
        x: 50,
        y: 100,
        width: 700,
        height: 80,
        content: currentEvent.title || 'Event Title',
        fontSize: 48,
        fontFamily: 'Inter',
        fill: '#1F2937',
        zIndex: 1
      },
      {
        id: 'host_text',
        type: 'text',
        x: 50,
        y: 200,
        width: 700,
        height: 40,
        content: `Hosted by ${currentEvent.host || 'Host Name'}`,
        fontSize: 24,
        fontFamily: 'Inter',
        fill: '#6B7280',
        zIndex: 2
      },
      {
        id: 'date_text',
        type: 'text',
        x: 50,
        y: 300,
        width: 350,
        height: 30,
        content: currentEvent.date ? new Date(currentEvent.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : 'Event Date',
        fontSize: 18,
        fontFamily: 'Inter',
        fill: '#374151',
        zIndex: 3
      },
      {
        id: 'time_text',
        type: 'text',
        x: 450,
        y: 300,
        width: 300,
        height: 30,
        content: currentEvent.time || 'Event Time',
        fontSize: 18,
        fontFamily: 'Inter',
        fill: '#374151',
        zIndex: 4
      },
      {
        id: 'venue_text',
        type: 'text',
        x: 50,
        y: 350,
        width: 700,
        height: 60,
        content: currentEvent.venue || 'Event Venue',
        fontSize: 16,
        fontFamily: 'Inter',
        fill: '#4B5563',
        zIndex: 5
      }
    ]
  });

  const handleDesignChange = (newDesign: CanvasDesign) => {
    setCanvasDesign(newDesign);
    updateEventData({ 
      customDesign: newDesign,
      theme: {
        ...currentEvent.theme,
        customBackground: newDesign.background
      }
    });
  };

  const handleBackgroundSelect = (background: string) => {
    const updatedDesign = {
      ...canvasDesign,
      background
    };
    setCanvasDesign(updatedDesign);
    updateEventData({ 
      customDesign: updatedDesign,
      theme: {
        ...currentEvent.theme,
        customBackground: background
      }
    });
  };

  const presetLayouts = [
    {
      name: 'Classic',
      description: 'Traditional centered layout',
      preview: 'bg-gradient-to-br from-blue-100 to-purple-100'
    },
    {
      name: 'Modern',
      description: 'Clean asymmetric design',
      preview: 'bg-gradient-to-r from-gray-100 to-gray-200'
    },
    {
      name: 'Festive',
      description: 'Colorful celebration theme',
      preview: 'bg-gradient-to-br from-pink-100 to-yellow-100'
    },
    {
      name: 'Elegant',
      description: 'Sophisticated formal style',
      preview: 'bg-gradient-to-br from-purple-100 to-indigo-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Design Your Invitation</h2>
        <p className="text-lg text-gray-600">Create a stunning visual design with our advanced editor</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-6 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('design')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'design'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>Design Editor</span>
        </button>
        <button
          onClick={() => setActiveTab('background')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'background'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Wand2 className="w-4 h-4" />
          <span>AI Backgrounds</span>
        </button>
      </div>

      {activeTab === 'design' && (
        <div className="space-y-6">
          {/* Quick Layout Presets */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Layout className="w-5 h-5 mr-2" />
              Quick Layout Presets
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {presetLayouts.map((layout) => (
                <button
                  key={layout.name}
                  className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
                >
                  <div className={`w-full h-20 rounded-lg mb-3 ${layout.preview}`}></div>
                  <h4 className="font-medium text-gray-900">{layout.name}</h4>
                  <p className="text-sm text-gray-600">{layout.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Canvas Editor */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <CanvasEditor
              design={canvasDesign}
              onDesignChange={handleDesignChange}
              eventData={currentEvent}
            />
          </div>
        </div>
      )}

      {activeTab === 'background' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <BackgroundGenerator
            eventType={currentEvent.type || 'birthday'}
            currentTheme={currentEvent.theme || { name: 'modern' }}
            onBackgroundSelect={handleBackgroundSelect}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="flex space-x-4 pt-8">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Continue to Publish
        </button>
      </div>
    </div>
  );
};

export default VisualDesigner;