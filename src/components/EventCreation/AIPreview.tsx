import React, { useEffect } from 'react';
import { Sparkles, RefreshCw, MapPin, Calendar, Clock } from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { generateEventDescription, generateBackgroundMusic } from '../../utils/aiGenerator';

interface AIPreviewProps {
  onNext: () => void;
  onBack: () => void;
}

const AIPreview: React.FC<AIPreviewProps> = ({ onNext, onBack }) => {
  const { currentEvent, updateEventData } = useEvent();

  useEffect(() => {
    if (currentEvent.type && currentEvent.title && currentEvent.host && !currentEvent.description) {
      const description = generateEventDescription(currentEvent.type, currentEvent.title, currentEvent.host);
      const backgroundMusic = generateBackgroundMusic(currentEvent.type);
      updateEventData({ description, backgroundMusic });
    }
  }, [currentEvent, updateEventData]);

  const regenerateDescription = () => {
    if (currentEvent.type && currentEvent.title && currentEvent.host) {
      const newDescription = generateEventDescription(currentEvent.type, currentEvent.title, currentEvent.host);
      updateEventData({ description: newDescription });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">AI Generated Preview</h2>
        </div>
        <p className="text-lg text-gray-600">Here's how your event invitation will look</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentEvent.title}</h1>
              <p className="text-lg text-gray-600">Hosted by {currentEvent.host}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 text-gray-700">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>{new Date(currentEvent.date || '').toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>{currentEvent.time}</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <span>{currentEvent.venue}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-gray-700 leading-relaxed">{currentEvent.description}</p>
            </div>

            <div className="mt-6">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                RSVP Now
              </button>
            </div>
          </div>
        </div>

        {/* AI Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Event Description</h3>
              <button
                onClick={regenerateDescription}
                className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">Regenerate</span>
              </button>
            </div>
            <p className="text-gray-700">{currentEvent.description}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Enhancements</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Background Music</p>
                  <p className="text-sm text-gray-600">{currentEvent.backgroundMusic}</p>
                </div>
                <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition-colors">
                  Add
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Photo Gallery</p>
                  <p className="text-sm text-gray-600">Let guests share memories</p>
                </div>
                <button className="text-green-600 hover:bg-green-100 p-2 rounded-lg transition-colors">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          Customize Theme
        </button>
      </div>
    </div>
  );
};

export default AIPreview;