import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event, EventFormData, Theme, RSVPResponse } from '../types';

interface EventContextType {
  currentEvent: Partial<Event>;
  setCurrentEvent: (event: Partial<Event>) => void;
  updateEventData: (data: Partial<Event>) => void;
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentEvent, setCurrentEvent] = useState<Partial<Event>>({});
  const [events, setEvents] = useState<Event[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const updateEventData = (data: Partial<Event>) => {
    setCurrentEvent(prev => ({ ...prev, ...data }));
  };

  const addEvent = (event: Event) => {
    setEvents(prev => [...prev, event]);
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ));
  };

  return (
    <EventContext.Provider value={{
      currentEvent,
      setCurrentEvent,
      updateEventData,
      events,
      addEvent,
      updateEvent,
      currentStep,
      setCurrentStep
    }}>
      {children}
    </EventContext.Provider>
  );
};