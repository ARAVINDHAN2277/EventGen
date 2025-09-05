import React from 'react';
import { Calendar, Users, BarChart3, Share2, Edit, Eye } from 'lucide-react';
import { useEvent } from '../context/EventContext';

const Dashboard: React.FC = () => {
  const { events } = useEvent();

  const getTotalRSVPs = () => {
    return events.reduce((total, event) => total + event.rsvpResponses.length, 0);
  };

  const getConfirmedGuests = () => {
    return events.reduce((total, event) => {
      return total + event.rsvpResponses
        .filter(rsvp => rsvp.status === 'confirmed')
        .reduce((sum, rsvp) => sum + rsvp.guestCount, 0);
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Dashboard</h1>
          <p className="text-gray-600">Manage your events and track RSVPs</p>
        </div>
        <button className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
          Create New Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Events</p>
              <p className="text-3xl font-bold text-gray-900">{events.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total RSVPs</p>
              <p className="text-3xl font-bold text-gray-900">{getTotalRSVPs()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Confirmed Guests</p>
              <p className="text-3xl font-bold text-gray-900">{getConfirmedGuests()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Response Rate</p>
              <p className="text-3xl font-bold text-gray-900">87%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Events</h2>
        </div>
        
        {events.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events yet</h3>
            <p className="text-gray-600 mb-6">Create your first event to get started</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Create Event
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {events.map((event) => {
              const confirmedCount = event.rsvpResponses
                .filter(rsvp => rsvp.status === 'confirmed')
                .reduce((sum, rsvp) => sum + rsvp.guestCount, 0);
              const totalRSVPs = event.rsvpResponses.length;

              return (
                <div key={event.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()} • {event.time}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{totalRSVPs} RSVPs</span>
                        <span>{confirmedCount} Confirmed</span>
                        <span>{event.rsvpResponses.filter(r => r.status === 'declined').length} Declined</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  </div>

                  {totalRSVPs > 0 && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>RSVP Progress</span>
                        <span>{Math.round((confirmedCount / (confirmedCount + event.rsvpResponses.filter(r => r.status === 'declined').length)) * 100) || 0}% confirmed</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(confirmedCount / Math.max(totalRSVPs, 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;