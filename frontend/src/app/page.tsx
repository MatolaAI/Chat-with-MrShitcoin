'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';
import { mockConversations } from '@/lib/mock-data';

export default function Home() {
  const [activeChatId, setActiveChatId] = useState<string | null>(mockConversations[0].id);

  const activeConversation = mockConversations.find((c) => c.id === activeChatId) || null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#111b21] p-4 lg:p-6">
      {/* Container to mimic the WhatsApp Web centered box */}
      <div className="mx-auto flex h-full w-full max-w-[1600px] overflow-hidden shadow-2xl">
        <Sidebar
          conversations={mockConversations}
          activeId={activeChatId}
          onSelect={setActiveChatId}
        />
        <ChatWindow conversation={activeConversation} />
      </div>
    </div>
  );
}