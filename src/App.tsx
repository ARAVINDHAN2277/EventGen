import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import EventTypeSelector from './components/EventCreation/EventTypeSelector';
import EventDetailsForm from './components/EventCreation/EventDetailsForm';
import AIPreview from './components/EventCreation/AIPreview';
import ThemeCustomizer from './components/EventCreation/ThemeCustomizer';
import VisualDesigner from './components/EventCreation/VisualDesigner';
import PublishStep from './components/EventCreation/PublishStep';
import Dashboard from './components/Dashboard';
import EventPage from './components/EventPage';
import { EventProvider, useEvent } from './context/EventContext';
import { ArrowLeft, Home } from 'lucide-react';

type AppView = 'landing' | 'creation' | 'dashboard' | 'event-page';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const { currentStep, setCurrentStep, events } = useEvent();

  const handleGetStarted = () => {
    setCurrentView('creation');
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePublishComplete = () => {
    setCurrentView('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setCurrentStep(1);
  };

  const renderCreationStep = () => {
    switch (currentStep) {
      case 1:
        return <EventTypeSelector onNext={handleNextStep} />;
      case 2:
        return <EventDetailsForm onNext={handleNextStep} onBack={handlePrevStep} />;
      case 3:
        return <AIPreview onNext={handleNextStep} onBack={handlePrevStep} />;
      case 4:
        return <VisualDesigner onNext={handleNextStep} onBack={handlePrevStep} />;
      case 5:
        return <ThemeCustomizer onNext={handleNextStep} onBack={handlePrevStep} />;
      case 6:
        return <PublishStep onComplete={handlePublishComplete} onBack={handlePrevStep} />;
      default:
        return <EventTypeSelector onNext={handleNextStep} />;
    }
  };

  const renderProgressBar = () => {
    const steps = ['Type', 'Details', 'Preview', 'Design', 'Theme', 'Publish'];
    const progressPercentage = (currentStep / steps.length) * 100;

    return (
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBackToLanding}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <span className="text-sm text-gray-600">Step {currentStep} of {steps.length}</span>
          </div>
          
          <div className="flex items-center space-x-4 mb-2">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <div className={`flex items-center space-x-2 ${
                  index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 < currentStep ? 'bg-blue-600 text-white' :
                    index + 1 === currentStep ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {index + 1 < currentStep ? '✓' : index + 1}
                  </div>
                  <span className="text-sm font-medium hidden md:block">{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 rounded ${
                    index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}

      {currentView === 'creation' && (
        <>
          {renderProgressBar()}
          <div className="py-12">
            {renderCreationStep()}
          </div>
        </>
      )}

      {currentView === 'dashboard' && (
        <Dashboard />
      )}

      {currentView === 'event-page' && events.length > 0 && (
        <EventPage event={events[0]} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <EventProvider>
      <AppContent />
    </EventProvider>
  );
};

export default App;