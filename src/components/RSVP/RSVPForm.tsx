import React, { useState } from 'react';
import { User, Mail, Phone, Users, MessageCircle } from 'lucide-react';
import { RSVPResponse } from '../../types';

interface RSVPFormProps {
  eventId: string;
  onSubmit: (response: Omit<RSVPResponse, 'id' | 'respondedAt'>) => void;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ eventId, onSubmit }) => {
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    status: 'pending' as const,
    guestCount: 1,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guestCount' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">RSVP</h3>
        <p className="text-gray-600">Let us know if you can make it!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4" />
            <span>Your Name</span>
          </label>
          <input
            type="text"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4" />
            <span>Phone (Optional)</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Will you attend?</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, status: 'confirmed' }))}
              className={`p-3 rounded-lg border-2 transition-colors ${
                formData.status === 'confirmed'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              ✅ Yes, I'll be there
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, status: 'declined' }))}
              className={`p-3 rounded-lg border-2 transition-colors ${
                formData.status === 'declined'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              ❌ Sorry, can't make it
            </button>
          </div>
        </div>

        {formData.status === 'confirmed' && (
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4" />
              <span>Number of Guests</span>
            </label>
            <select
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <MessageCircle className="w-4 h-4" />
            <span>Message (Optional)</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Any message for the host..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!formData.guestName || !formData.email || formData.status === 'pending'}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            formData.guestName && formData.email && formData.status !== 'pending'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit RSVP
        </button>
      </form>
    </div>
  );
};

export default RSVPForm;