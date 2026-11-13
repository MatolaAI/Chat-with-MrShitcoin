import { ApiConversation } from '@/services/api';
import { Conversation } from './mock-data';

export function adaptConversation(api: ApiConversation, currentUserId: string): Conversation {
  const otherUser = api.participants.find((p) => p.user.id !== currentUserId)?.user;
  const name = api.type === 'GROUP' ? (api.title || 'Group') : (otherUser?.name || 'Unknown');

  const lastMsg = api.messages[0];
  const senderName = lastMsg?.sender?.name?.split(' ')[0] || '';

  return {
    id: api.id,
    name,
    avatarInitials: name.replace(/[^a-zA-Z]/g, '').substring(0, 2).toUpperCase(),
    lastMessage: lastMsg ? (api.type === 'GROUP' ? `~${senderName}: ${lastMsg.body}` : lastMsg.body) : 'No messages yet',
    timestamp: lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
    unreadCount: 0,
    isGroup: api.type === 'GROUP',
    adminOnly: api.adminOnly,
    description: api.description || undefined,
    messages: [],
  };
}
