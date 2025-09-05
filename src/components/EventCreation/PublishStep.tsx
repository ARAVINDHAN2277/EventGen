import React, { useEffect, useState } from 'react';
import { Share2, Copy, QrCode, ExternalLink, CheckCircle } from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { generateQRCode, generateShareableLink } from '../../utils/aiGenerator';

interface PublishStepProps {
  onComplete: () => void;
  onBack: () => void;
}

const PublishStep: React.FC<PublishStepProps> = ({ onComplete, onBack }) => {
  const { currentEvent, updateEventData, addEvent } = useEvent();
  const [shareableLink, setShareableLink] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const eventId = `event_${Date.now()}`;
    const link = generateShareableLink(eventId);
    const qrCode = generateQRCode(link);
    
    setShareableLink(link);
    setQrCodeUrl(qrCode);
    
    // Create final event object
    const finalEvent = {
      ...currentEvent,
      id: eventId,
      shareableLink: link,
      qrCode: qrCode,
      isPublished: true,
      createdAt: new Date().toISOString(),
      rsvpResponses: []
    } as any;

    updateEventData(finalEvent);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePublish = () => {
    // Add event to the events list
    const event = {
      ...currentEvent,
      id: currentEvent.id || `event_${Date.now()}`,
      shareableLink,
      qrCode: qrCodeUrl,
      isPublished: true,
      createdAt: new Date().toISOString(),
      rsvpResponses: []
    } as any;
    
    addEvent(event);
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600 mr-2" />
          <h2 className="text-3xl font-bold text-gray-900">Event Ready to Publish!</h2>
        </div>
        <p className="text-lg text-gray-600">Your beautiful event invitation is ready to share with the world</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-blue-600 mb-2">{currentEvent.title}</h1>
              <p className="text-gray-600">Hosted by {currentEvent.host}</p>
            </div>
            <div className="text-center text-sm text-gray-500 mb-4">
              {new Date(currentEvent.date || '').toLocaleDateString()} • {currentEvent.time}
            </div>
            <p className="text-gray-700 text-center text-sm mb-4">{currentEvent.description}</p>
            <div className="bg-blue-600 text-white text-center py-2 rounded-lg text-sm">
              RSVP Now
            </div>
          </div>
        </div>

        {/* Sharing Options */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Share2 className="w-5 h-5 mr-2" />
              Share Your Event
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shareable Link</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={shareableLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">QR Code</label>
                <div className="flex items-center space-x-4">
                  <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24 border rounded-lg" />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Let guests scan to RSVP instantly</p>
                    <button className="text-blue-600 text-sm hover:underline flex items-center space-x-1">
                      <QrCode className="w-4 h-4" />
                      <span>Download QR Code</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Share the link via WhatsApp, email, or social media</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Track RSVPs in real-time on your dashboard</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Send updates or reminders to your guests</span>
              </li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={shareableLink ? () => window.open(shareableLink, '_blank') : undefined}
              className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Preview Event</span>
            </button>
            <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Share Now
            </button>
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
          onClick={handlePublish}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PublishStep;