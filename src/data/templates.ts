import { Theme } from '../types';

export const eventTypes = [
  {
    id: 'birthday',
    name: 'Birthday Party',
    icon: '🎂',
    description: 'Celebrate another year of life with friends and family'
  },
  {
    id: 'wedding',
    name: 'Wedding',
    icon: '💒',
    description: 'Share your special day with loved ones'
  },
  {
    id: 'corporate',
    name: 'Corporate Event',
    icon: '🏢',
    description: 'Professional gatherings and business celebrations'
  },
  {
    id: 'school',
    name: 'School Event',
    icon: '🎓',
    description: 'Educational celebrations and school gatherings'
  }
];

export const themes: Theme[] = [
  {
    id: 'modern',
    name: 'Modern',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: 'Inter'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    primaryColor: '#6B7280',
    secondaryColor: '#374151',
    backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    fontFamily: 'Inter'
  },
  {
    id: 'festive',
    name: 'Festive',
    primaryColor: '#F59E0B',
    secondaryColor: '#D97706',
    backgroundImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    fontFamily: 'Inter'
  },
  {
    id: 'professional',
    name: 'Professional',
    primaryColor: '#059669',
    secondaryColor: '#047857',
    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: 'Inter'
  }
];