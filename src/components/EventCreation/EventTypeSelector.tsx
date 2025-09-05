import React from 'react';
import { eventTypes } from '../../data/templates';
import { useEvent } from '../../context/EventContext';

interface EventTypeSelectorProps {
  onNext: () => void;
}

const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({ onNext }) => {
  const { currentEvent, updateEventData } = useEvent();

  const handleTypeSelect = (typeId: string) => {
    updateEventData({ type: typeId });
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">What type of event are you creating?</h2>
        <p className="text-xl text-gray-600">Choose the category that best fits your celebration</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {eventTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleTypeSelect(type.id)}
            className={`p-8 rounded-2xl border-2 transition-all duration-200 text-left hover:shadow-lg transform hover:scale-105 ${
              currentEvent.type === type.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-4xl">{type.icon}</span>
              <h3 className="text-2xl font-bold text-gray-900">{type.name}</h3>
            </div>
            <p className="text-gray-600 text-lg">{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventTypeSelector;