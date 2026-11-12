export type Message = {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
};

export type Conversation = {
  id: string;
  name: string;
  avatarInitials: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
};

export const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Mwarabu💚',
    avatarInitials: 'MW',
    lastMessage: 'Tuko pamoja kwenye hilo.',
    timestamp: '10:42 AM',
    unreadCount: 2,
    messages: [
      { id: 'm1', text: 'Habari za asubuhi?', sender: 'them', timestamp: '10:40 AM', status: 'read' },
      { id: 'm2', text: 'Nzuri sana, wewe je?', sender: 'me', timestamp: '10:41 AM', status: 'read' },
      { id: 'm3', text: 'Tuko pamoja kwenye hilo.', sender: 'them', timestamp: '10:42 AM', status: 'read' },
    ],
  },
  {
    id: '2',
    name: 'Angel💚',
    avatarInitials: 'AN',
    lastMessage: 'I will send the documents today.',
    timestamp: '10:15 AM',
    unreadCount: 0,
    messages: [
      { id: 'm4', text: 'Hi, did you receive my email?', sender: 'me', timestamp: '09:30 AM', status: 'read' },
      { id: 'm5', text: 'Yes, looking at it now.', sender: 'them', timestamp: '09:45 AM', status: 'read' },
      { id: 'm6', text: 'I will send the documents today.', sender: 'them', timestamp: '10:15 AM', status: 'read' },
    ],
  },
  {
    id: '3',
    name: 'Diana',
    avatarInitials: 'DI',
    lastMessage: 'Okay, see you tomorrow!',
    timestamp: '09:30 AM',
    unreadCount: 1,
    messages: [
      { id: 'm7', text: 'Are we still meeting at 2 PM?', sender: 'them', timestamp: '09:20 AM', status: 'read' },
      { id: 'm8', text: 'Yes, at the usual place.', sender: 'me', timestamp: '09:25 AM', status: 'read' },
      { id: 'm9', text: 'Okay, see you tomorrow!', sender: 'them', timestamp: '09:30 AM', status: 'read' },
    ],
  },
  {
    id: '4',
    name: 'Mshangazi sinza',
    avatarInitials: 'MS',
    lastMessage: 'Asante sana kwa msaada.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 'm10', text: 'Shikamoo mshangazi.', sender: 'me', timestamp: 'Yesterday', status: 'read' },
      { id: 'm11', text: 'Marahaba mwanangu.', sender: 'them', timestamp: 'Yesterday', status: 'read' },
      { id: 'm12', text: 'Asante sana kwa msaada.', sender: 'them', timestamp: 'Yesterday', status: 'read' },
    ],
  },
  {
    id: '5',
    name: 'Jamal April',
    avatarInitials: 'JA',
    lastMessage: 'Sent you the invoice.',
    timestamp: 'Yesterday',
    unreadCount: 3,
    messages: [
      { id: 'm13', text: 'Hey, I need the invoice for last month.', sender: 'me', timestamp: 'Yesterday', status: 'read' },
      { id: 'm14', text: 'Let me check my system.', sender: 'them', timestamp: 'Yesterday', status: 'read' },
      { id: 'm15', text: 'Sent you the invoice.', sender: 'them', timestamp: 'Yesterday', status: 'read' },
    ],
  },
  {
    id: '6',
    name: 'Salha💚',
    avatarInitials: 'SA',
    lastMessage: 'Picha zilipendeza sana!',
    timestamp: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 'm16', text: 'Nimetuma picha zote kwenye drive.', sender: 'me', timestamp: 'Yesterday', status: 'read' },
      { id: 'm17', text: 'Picha zilipendeza sana!', sender: 'them', timestamp: 'Yesterday', status: 'read' },
    ],
  },
  {
    id: '7',
    name: 'Husna💚',
    avatarInitials: 'HU',
    lastMessage: 'Are you coming to the event?',
    timestamp: 'Monday',
    unreadCount: 1,
    messages: [
      { id: 'm18', text: 'The event is this Saturday.', sender: 'them', timestamp: 'Monday', status: 'read' },
      { id: 'm19', text: 'Are you coming to the event?', sender: 'them', timestamp: 'Monday', status: 'read' },
    ],
  },
  {
    id: '8',
    name: 'Support Team',
    avatarInitials: 'ST',
    lastMessage: 'Your ticket has been resolved.',
    timestamp: 'Monday',
    unreadCount: 0,
    messages: [
      { id: 'm20', text: 'I need help with my account.', sender: 'me', timestamp: 'Monday', status: 'read' },
      { id: 'm21', text: 'Your ticket has been resolved.', sender: 'them', timestamp: 'Monday', status: 'read' },
    ],
  },
  {
    id: '9',
    name: 'Ali Kiba',
    avatarInitials: 'AK',
    lastMessage: 'Tupo studio muda huu.',
    timestamp: 'Sunday',
    unreadCount: 4,
    messages: [
      { id: 'm22', text: 'Nimefika mkuu.', sender: 'me', timestamp: 'Sunday', status: 'read' },
      { id: 'm23', text: 'Tupo studio muda huu.', sender: 'them', timestamp: 'Sunday', status: 'read' },
    ],
  },
  {
    id: '10',
    name: 'Fatma Ally',
    avatarInitials: 'FA',
    lastMessage: 'Naomba unipigie baadaye kidogo.',
    timestamp: 'Sunday',
    unreadCount: 0,
    messages: [
      { id: 'm24', text: 'Upo busy?', sender: 'them', timestamp: 'Sunday', status: 'read' },
      { id: 'm25', text: 'Naomba unipigie baadaye kidogo.', sender: 'them', timestamp: 'Sunday', status: 'read' },
    ],
  },
  {
    id: '11',
    name: 'David M.',
    avatarInitials: 'DM',
    lastMessage: 'The server is back online.',
    timestamp: 'Saturday',
    unreadCount: 0,
    messages: [
      { id: 'm26', text: 'Are you experiencing downtime?', sender: 'me', timestamp: 'Saturday', status: 'read' },
      { id: 'm27', text: 'The server is back online.', sender: 'them', timestamp: 'Saturday', status: 'read' },
    ],
  },
  {
    id: '12',
    name: 'Amina Issa',
    avatarInitials: 'AI',
    lastMessage: 'Tutaongea kesho.',
    timestamp: 'Saturday',
    unreadCount: 2,
    messages: [
      { id: 'm28', text: 'Nimekumiss sana!', sender: 'me', timestamp: 'Saturday', status: 'read' },
      { id: 'm29', text: 'Tutaongea kesho.', sender: 'them', timestamp: 'Saturday', status: 'read' },
    ],
  },
  {
    id: '13',
    name: 'Joseph Mwita',
    avatarInitials: 'JM',
    lastMessage: 'Got it, thanks!',
    timestamp: 'Friday',
    unreadCount: 0,
    messages: [
      { id: 'm30', text: 'I sent the updated files.', sender: 'me', timestamp: 'Friday', status: 'read' },
      { id: 'm31', text: 'Got it, thanks!', sender: 'them', timestamp: 'Friday', status: 'read' },
    ],
  },
  {
    id: '14',
    name: 'Rehema Juma',
    avatarInitials: 'RJ',
    lastMessage: 'Sawa, nitakuja.',
    timestamp: 'Friday',
    unreadCount: 1,
    messages: [
      { id: 'm32', text: 'Tuna kikao saa nne.', sender: 'me', timestamp: 'Friday', status: 'read' },
      { id: 'm33', text: 'Sawa, nitakuja.', sender: 'them', timestamp: 'Friday', status: 'read' },
    ],
  },
  {
    id: '15',
    name: 'Neema Mushi',
    avatarInitials: 'NM',
    lastMessage: 'Poa sana, asante.',
    timestamp: 'Thursday',
    unreadCount: 0,
    messages: [
      { id: 'm34', text: 'Nimekutumia location.', sender: 'me', timestamp: 'Thursday', status: 'read' },
      { id: 'm35', text: 'Poa sana, asante.', sender: 'them', timestamp: 'Thursday', status: 'read' },
    ],
  },
  {
    id: '16',
    name: 'Emmanuel',
    avatarInitials: 'EM',
    lastMessage: 'Let me know when you are free.',
    timestamp: 'Thursday',
    unreadCount: 0,
    messages: [
      { id: 'm36', text: 'Can we schedule a call?', sender: 'them', timestamp: 'Thursday', status: 'read' },
      { id: 'm37', text: 'Let me know when you are free.', sender: 'them', timestamp: 'Thursday', status: 'read' },
    ],
  },
  {
    id: '17',
    name: 'Zainab',
    avatarInitials: 'ZA',
    lastMessage: 'Nimesha sign mkataba.',
    timestamp: 'Wednesday',
    unreadCount: 0,
    messages: [
      { id: 'm38', text: 'Umeshafanya signature?', sender: 'me', timestamp: 'Wednesday', status: 'read' },
      { id: 'm39', text: 'Nimesha sign mkataba.', sender: 'them', timestamp: 'Wednesday', status: 'read' },
    ],
  },
  {
    id: '18',
    name: 'Kelvin Peter',
    avatarInitials: 'KP',
    lastMessage: 'See you at the gym.',
    timestamp: 'Wednesday',
    unreadCount: 2,
    messages: [
      { id: 'm40', text: 'Tuna workout leo?', sender: 'them', timestamp: 'Wednesday', status: 'read' },
      { id: 'm41', text: 'See you at the gym.', sender: 'me', timestamp: 'Wednesday', status: 'read' },
    ],
  },
  {
    id: '19',
    name: 'Grace Mushi',
    avatarInitials: 'GM',
    lastMessage: 'Happy birthday! 🎉',
    timestamp: 'Tuesday',
    unreadCount: 0,
    messages: [
      { id: 'm42', text: 'Happy birthday! 🎉', sender: 'them', timestamp: 'Tuesday', status: 'read' },
      { id: 'm43', text: 'Thank you so much!', sender: 'me', timestamp: 'Tuesday', status: 'read' },
    ],
  },
  {
    id: '20',
    name: 'Baraka Tours',
    avatarInitials: 'BT',
    lastMessage: 'Your booking is confirmed.',
    timestamp: 'Tuesday',
    unreadCount: 1,
    messages: [
      { id: 'm44', text: 'I paid for the safari trip.', sender: 'me', timestamp: 'Tuesday', status: 'read' },
      { id: 'm45', text: 'Your booking is confirmed.', sender: 'them', timestamp: 'Tuesday', status: 'read' },
    ],
  },
];