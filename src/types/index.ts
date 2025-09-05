export interface Event {
  id: string;
  title: string;
  host: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  type: EventType;
  theme: Theme;
  backgroundMusic?: string;
  photos: string[];
  shareableLink: string;
  qrCode: string;
  rsvpResponses: RSVPResponse[];
  isPublished: boolean;
  createdAt: string;
}

export interface EventType {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundImage?: string;
  fontFamily: string;
}

export interface RSVPResponse {
  id: string;
  guestName: string;
  email: string;
  phone?: string;
  status: 'confirmed' | 'declined' | 'pending';
  guestCount: number;
  message?: string;
  respondedAt: string;
}

export interface EventFormData {
  title: string;
  host: string;
  date: string;
  time: string;
  venue: string;
  type: string;
  description?: string;
}