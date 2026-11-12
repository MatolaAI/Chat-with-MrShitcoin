'use client';

import { useState } from 'react';
import NavRail from '@/components/NavRail';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';
import StatusSidebar from '@/components/StatusSidebar';
import StatusView from '@/components/StatusView';
import { mockConversations, Conversation, Message } from '@/lib/mock-data';

// NEW: Added allowedViewers array
export type MyStatus = {
  type: 'text' | 'image' | null;
  content: string;
  allowedViewers: string[]; 
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'chats' | 'status'>('chats');
  
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeChatId, setActiveChatId] = useState<string | null>(mockConversations[0].id);

  const [myStatus, setMyStatus] = useState<MyStatus>({ type: null, content: '', allowedViewers: [] });

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
        
        <NavRail activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'chats' ? (
          <>
            <Sidebar
              conversations={conversations}
              activeId={activeChatId}
              onSelect={setActiveChatId}
            />
            <ChatWindow 
              conversation={activeConversation} 
              onSendMessage={handleSendMessage} 
            />
          </>
        ) : (
          <>
            <StatusSidebar myStatus={myStatus} />
            {/* We pass conversations to StatusView so it can filter eligible viewers */}
            <StatusView 
              myStatus={myStatus} 
              onSetStatus={setMyStatus} 
              conversations={conversations} 
            />
          </>
        )}

      </div>
    </div>
  );
}