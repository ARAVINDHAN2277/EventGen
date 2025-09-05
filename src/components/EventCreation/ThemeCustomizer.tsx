import React, { useState } from 'react';
import { Palette, Upload, Music } from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { themes } from '../../data/templates';

interface ThemeCustomizerProps {
  onNext: () => void;
  onBack: () => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ onNext, onBack }) => {
  const { currentEvent, updateEventData } = useEvent();
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const handleThemeSelect = (theme: any) => {
    setSelectedTheme(theme);
    updateEventData({ theme });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // In a real app, you'd upload these to a server
    const mockUrls = files.map(() => `https://picsum.photos/400/300?random=${Math.random()}`);
    setUploadedPhotos(prev => [...prev, ...mockUrls]);
    updateEventData({ photos: [...uploadedPhotos, ...mockUrls] });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Customize Your Theme</h2>
        <p className="text-lg text-gray-600">Make your event invitation uniquely yours</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Theme Selection */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Choose Theme
              </h3>
              <div className="grid gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeSelect(theme)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedTheme.id === theme.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div 
                      className="w-full h-8 rounded-lg mb-2"
                      style={{ background: theme.backgroundImage }}
                    ></div>
                    <p className="font-medium text-gray-900">{theme.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Add Photos
              </h3>
              <div className="space-y-3">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {uploadedPhotos.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {uploadedPhotos.slice(0, 4).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-16 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Music className="w-5 h-5 mr-2" />
                Background Music
              </h3>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900 font-medium">Currently Selected:</p>
                <p className="text-blue-700">{currentEvent.backgroundMusic}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
            <div 
              className="rounded-2xl p-8 min-h-96"
              style={{ background: selectedTheme.backgroundImage }}
            >
              <div className="bg-white/95 backdrop-blur rounded-xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <h1 
                    className="text-3xl font-bold mb-2"
                    style={{ color: selectedTheme.primaryColor }}
                  >
                    {currentEvent.title}
                  </h1>
                  <p className="text-lg text-gray-600">Hosted by {currentEvent.host}</p>
                </div>

                <div className="space-y-4 mb-6 text-gray-700">
                  <div className="flex items-center justify-center space-x-2">
                    <span>{new Date(currentEvent.date || '').toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{currentEvent.time}</span>
                  </div>
                  <div className="text-center">
                    <span>{currentEvent.venue}</span>
                  </div>
                </div>

                {uploadedPhotos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {uploadedPhotos.slice(0, 3).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                <div className="border-t pt-4 mb-6">
                  <p className="text-gray-700 text-center leading-relaxed">
                    {currentEvent.description}
                  </p>
                </div>

                <button 
                  className="w-full py-3 rounded-lg font-medium text-white transition-colors"
                  style={{ backgroundColor: selectedTheme.primaryColor }}
                >
                  RSVP Now
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
          Publish Event
        </button>
      </div>
    </div>
  );
};

export default ThemeCustomizer;