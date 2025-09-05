export const generateEventDescription = (type: string, title: string, host: string): string => {
  const descriptions = {
    birthday: [
      `Join us for ${title} as ${host} celebrates another wonderful year! Come ready to make memories, share laughter, and enjoy great company.`,
      `You're invited to help ${host} celebrate ${title}! Let's make this birthday unforgettable with friends, fun, and festivities.`,
      `It's time to party! ${host} is turning another year fabulous and you're invited to ${title}. Bring your smile and party spirit!`
    ],
    wedding: [
      `${host} cordially invites you to witness and celebrate ${title}. Join us as we begin our journey together surrounded by love and cherished friends.`,
      `With hearts full of love and joy, ${host} requests your presence at ${title}. Your blessing would make our special day complete.`,
      `Love is in the air! ${host} joyfully invites you to celebrate ${title}. Come share in this beautiful moment as two hearts become one.`
    ],
    corporate: [
      `${host} is pleased to invite you to ${title}. Join us for an evening of networking, celebration, and professional excellence.`,
      `You're cordially invited to attend ${title} hosted by ${host}. Let's come together to celebrate our achievements and future success.`,
      `${host} requests your presence at ${title}. Join colleagues and industry leaders for an inspiring and memorable event.`
    ],
    school: [
      `${host} invites you to join us for ${title}. Come celebrate our students' achievements and the wonderful school community we've built together.`,
      `You're invited to ${title} hosted by ${host}. Let's celebrate learning, growth, and the bright futures ahead of our students.`,
      `${host} cordially invites you to attend ${title}. Join us in honoring academic excellence and community spirit.`
    ]
  };

  const typeDescriptions = descriptions[type as keyof typeof descriptions] || descriptions.birthday;
  return typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)];
};

export const generateBackgroundMusic = (type: string): string => {
  const musicSuggestions = {
    birthday: 'Upbeat Pop & Celebration Mix',
    wedding: 'Romantic Classical & Acoustic',
    corporate: 'Professional Jazz & Ambient',
    school: 'Inspirational & Uplifting Instrumental'
  };

  return musicSuggestions[type as keyof typeof musicSuggestions] || 'Background Ambient Music';
};

export const generateQRCode = (url: string): string => {
  // In a real app, this would integrate with a QR code API
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
};

export const generateShareableLink = (eventId: string): string => {
  return `${window.location.origin}/event/${eventId}`;
};