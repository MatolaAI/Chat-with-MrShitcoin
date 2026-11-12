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
    name: 'Mr. Shitcoin',
    avatarInitials: 'MS',
    lastMessage: 'Did you check the new pricing?',
    timestamp: '10:42 AM',
    unreadCount: 2,
    messages: [
      { id: 'm1', text: 'Hey, are you there?', sender: 'them', timestamp: '10:40 AM', status: 'read' },
      { id: 'm2', text: 'Yes, just looking at the dashboard.', sender: 'me', timestamp: '10:41 AM', status: 'read' },
      { id: 'm3', text: 'Did you check the new pricing?', sender: 'them', timestamp: '10:42 AM', status: 'read' },
    ],
  },
  {
    id: '2',
    name: 'Support Team',
    avatarInitials: 'ST',
    lastMessage: 'Your ticket has been resolved.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 'm4', text: 'I need help with my account.', sender: 'me', timestamp: 'Yesterday', status: 'read' },
      { id: 'm5', text: 'Your ticket has been resolved.', sender: 'them', timestamp: 'Yesterday', status: 'read' },
    ],
  },
];