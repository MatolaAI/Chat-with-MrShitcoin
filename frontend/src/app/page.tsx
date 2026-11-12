'use client';

import { useState } from 'react';
import NavRail from '@/components/NavRail';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';
import { mockConversations } from '@/lib/mock-data';

export default function Home() {
  const [activeChatId, setActiveChatId] = useState<string | null>(mockConversations[0].id);

  const activeConversation = mockConversations.find((c) => c.id === activeChatId) || null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0b141a] p-0 lg:p-4">
      {/* App Container */}
      <div className="mx-auto flex h-full w-full max-w-[1600px] overflow-hidden lg:rounded-md bg-wa-panel shadow-2xl">
        {/* 1. New Navigation Rail */}
        <NavRail />
        
        {/* 2. Existing Sidebar */}
        <Sidebar
          conversations={mockConversations}
          activeId={activeChatId}
          onSelect={setActiveChatId}
        />
        
        {/* 3. Existing Chat Window */}
        <ChatWindow conversation={activeConversation} />
      </div>
    </div>
  );
}