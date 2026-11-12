'use client';

import { useState } from 'react';
import NavRail from '@/components/NavRail';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';
import { mockConversations, Conversation, Message } from '@/lib/mock-data';

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeChatId, setActiveChatId] = useState<string | null>(mockConversations[0].id);

  const activeConversation = conversations.find((c) => c.id === activeChatId) || null;

  const handleSendMessage = (text: string) => {
    if (!activeChatId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            lastMessage: text,
            timestamp: newMessage.timestamp,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      })
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0b141a] p-0 lg:p-4">
      <div className="mx-auto flex h-full w-full max-w-[1600px] overflow-hidden lg:rounded-md bg-wa-panel shadow-2xl">
        <NavRail />
        <Sidebar
          conversations={conversations}
          activeId={activeChatId}
          onSelect={setActiveChatId}
        />
        <ChatWindow 
          conversation={activeConversation} 
          onSendMessage={handleSendMessage} 
        />
      </div>
    </div>
  );
}