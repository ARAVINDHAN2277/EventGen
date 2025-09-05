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
  customBackground?: string;
  generatedBackground?: string;
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

export interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  content?: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  src?: string;
  zIndex: number;
}

export interface CanvasDesign {
  id: string;
  width: number;
  height: number;
  background: string;
  elements: CanvasElement[];
}