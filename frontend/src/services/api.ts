const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// The ID of Mr. Shitcoin from the database
export const ADMIN_USER_ID = '9cbd7631-19f8-43d5-846f-2d40b629d162';

export type ApiMessage = {
  id: string;
  body: string;
  senderId: string;
  createdAt: string;
  sender: { id: string; name: string };
};

export type ApiConversation = {
  id: string;
  type: 'DIRECT' | 'GROUP';
  title: string | null;
  description: string | null;
  adminOnly: boolean;
  participants: { user: { id: string; name: string } }[];
  messages: ApiMessage[];
};

export async function fetchConversations(userId: string): Promise<ApiConversation[]> {
  const res = await fetch(`${API_URL}/conversations/user/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch conversations');
  return res.json();
}

export async function fetchMessages(conversationId: string): Promise<ApiMessage[]> {
  const res = await fetch(`${API_URL}/messages/${conversationId}`);
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
}

export async function sendMessage(
  conversationId: string,
  senderId: string,
  text: string,
): Promise<ApiMessage> {
  const res = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId, senderId, text }),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}