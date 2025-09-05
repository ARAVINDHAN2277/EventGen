import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Music, Image } from 'lucide-react';
import RSVPForm from './RSVP/RSVPForm';
import { Event, RSVPResponse } from '../types';

interface EventPageProps {
  event: Event;
}

const EventPage: React.FC<EventPageProps> = ({ event }) => {
  const [showRSVP, setShowRSVP] = useState(false);
  const [rsvpSubmitted, setRSVPSubmitted] = useState(false);

  const handleRSVPSubmit = (response: Omit<RSVPResponse, 'id' | 'respondedAt'>) => {
    // In a real app, this would submit to a backend
    console.log('RSVP submitted:', response);
    setRSVPSubmitted(true);
    setShowRSVP(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Event Header */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{ 
          background: event.theme?.backgroundImage || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{event.title}</h1>
            <p className="text-xl md:text-2xl opacity-90">Hosted by {event.host}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <span className="text-lg text-gray-700">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <span className="text-lg text-gray-700">{event.time}</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <span className="text-lg text-gray-700">{event.venue}</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
              </div>
            </div>

            {/* Photo Gallery */}
            {event.photos && event.photos.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Image className="w-6 h-6 mr-2" />
                  Photo Gallery
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {event.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Event photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-xl hover:scale-105 transition-transform cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
              <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Google Maps Integration</p>
                  <p className="text-sm">{event.venue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* RSVP Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {rsvpSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">RSVP Submitted!</h3>
                  <p className="text-gray-600">Thank you for responding. We'll see you there!</p>
                </div>
              ) : showRSVP ? (
                <RSVPForm eventId={event.id} onSubmit={handleRSVPSubmit} />
              ) : (
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Will you be there?</h3>
                  <button
                    onClick={() => setShowRSVP(true)}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    RSVP Now
                  </button>
                </div>
              )}
            </div>

            {/* Background Music */}
            {event.backgroundMusic && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Music className="w-5 h-5 mr-2" />
                  Background Music
                </h3>
                <p className="text-gray-600 text-sm">{event.backgroundMusic}</p>
                <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  🎵 Preview Music
                </button>
              </div>
            )}

            {/* Event Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total RSVPs</span>
                  <span className="font-medium">{event.rsvpResponses?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Attending</span>
                  <span className="font-medium text-green-600">
                    {event.rsvpResponses?.filter(r => r.status === 'confirmed').length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Can't Make It</span>
                  <span className="font-medium text-red-600">
                    {event.rsvpResponses?.filter(r => r.status === 'declined').length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;