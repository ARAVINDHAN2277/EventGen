// AI Image Generation utilities
export const generateEventBackground = async (
  eventType: string,
  theme: string,
  prompt?: string
): Promise<string> => {
  // In a real implementation, this would call Stability AI, DALL-E, or Replicate
  const basePrompts = {
    birthday: 'colorful birthday party background with balloons, confetti, and celebration elements',
    wedding: 'elegant wedding background with flowers, soft lighting, romantic atmosphere',
    corporate: 'professional corporate event background, modern office space, clean design',
    school: 'academic graduation background with books, diploma, educational elements'
  };

  const themeModifiers = {
    modern: 'modern, minimalist, clean lines, contemporary',
    minimal: 'minimal, simple, white space, elegant',
    festive: 'vibrant, colorful, energetic, celebratory',
    professional: 'professional, sophisticated, business-like'
  };

  const fullPrompt = `${basePrompts[eventType as keyof typeof basePrompts]}, ${themeModifiers[theme as keyof typeof themeModifiers]}, high quality, 16:9 aspect ratio, ${prompt || ''}`;

  // Mock API call - replace with actual Stability AI/DALL-E integration
  console.log('Generating image with prompt:', fullPrompt);
  
  // Return a placeholder image for now
  const mockImages = [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=675&fit=crop',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=675&fit=crop',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=675&fit=crop',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=675&fit=crop'
  ];

  return mockImages[Math.floor(Math.random() * mockImages.length)];
};

export const generateThemeVariations = (baseTheme: any, eventType: string) => {
  const variations = [];
  const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];
  
  colors.forEach((color, index) => {
    variations.push({
      ...baseTheme,
      id: `${baseTheme.id}_var_${index}`,
      name: `${baseTheme.name} ${index + 1}`,
      primaryColor: color,
      secondaryColor: adjustColorBrightness(color, -20)
    });
  });

  return variations;
};

const adjustColorBrightness = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
};

export const exportCanvasAsImage = async (canvasRef: any): Promise<string> => {
  if (!canvasRef) return '';
  
  try {
    const dataURL = canvasRef.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2 // Higher resolution
    });
    return dataURL;
  } catch (error) {
    console.error('Error exporting canvas:', error);
    return '';
  }
};