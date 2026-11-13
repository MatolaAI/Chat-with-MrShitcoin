'use client';

import { useState, useEffect } from 'react';
import NavRail from '@/components/NavRail';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';
import StatusSidebar from '@/components/StatusSidebar';
import StatusView from '@/components/StatusView';
import ContactsSidebar from '@/components/ContactsSidebar'; // NEW
import ContactsView from '@/components/ContactsView';       // NEW
import CreateGroupModal from '@/components/CreateGroupModal';
import { Conversation } from '@/lib/mock-data';
import { ADMIN_USER_ID, fetchConversations, fetchMessages, sendMessage } from '@/services/api';
import { adaptConversation } from '@/lib/adapter';

export type MyStatus = {
  type: 'text' | 'image' | null;
  content: string;
  allowedViewers: string[];
};

export default function Home() {
  // NEW: Added 'contacts' to the allowed tabs
  const [activeTab, setActiveTab] = useState<'chats' | 'status' | 'contacts'>('chats');
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [myStatus, setMyStatus] = useState<MyStatus>({ type: null, content: '', allowedViewers: [] });
  const [loading, setLoading] = useState(true);
  
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const apiConvs = await fetchConversations(ADMIN_USER_ID);
        const adapted = apiConvs.map((c) => adaptConversation(c, ADMIN_USER_ID));
        setConversations(adapted);
        if (adapted.length > 0 && !activeChatId) {
          setActiveChatId(adapted[0].id);
        }
      } catch (err) {
        console.error('Failed to load conversations', err);
      } finally {
        setLoading(false);
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  useEffect(() => {
    if (!activeChatId) return;
    const chatId = activeChatId;
    async function loadMessages() {
      try {
        const msgs = await fetchMessages(chatId);
        setConversations((prev) =>
          prev.map((c) => {
            if (c.id !== chatId) return c;
            return {
              ...c,
              messages: msgs.map((m) => ({
                id: m.id,
                text: m.body,
                sender: m.senderId === ADMIN_USER_ID ? 'me' : 'them',
                senderName: m.sender.name,
                timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'read',
              })),
            };
          })
        );
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    }
    loadMessages();
  }, [activeChatId]);

  const activeConversation = conversations.find((c) => c.id === activeChatId) || null;

  const handleSendMessage = async (text: string) => {
    if (!activeChatId) return;
    const chatId = activeChatId;
    try {
      await sendMessage(chatId, ADMIN_USER_ID, text);
      const msgs = await fetchMessages(chatId);
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== chatId) return c;
          return {
            ...c,
            lastMessage: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            messages: msgs.map((m) => ({
              id: m.id,
              text: m.body,
              sender: m.senderId === ADMIN_USER_ID ? 'me' : 'them',
              senderName: m.sender.name,
              timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: 'read',
            })),
          };
        })
      );
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0b141a] text-wa-text">
        <p>Loading chats from database... 🚀</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0b141a] p-0 lg:p-4">
      <div className="mx-auto flex h-full w-full max-w-[1600px] overflow-hidden lg:rounded-md bg-wa-panel shadow-2xl">
        <NavRail activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* CHATS TAB */}
        {activeTab === 'chats' && (
          <>
            <Sidebar
              conversations={conversations}
              activeId={activeChatId}
              onSelect={setActiveChatId}
              onCreateGroup={() => setShowCreateGroup(true)}
            />
            <ChatWindow conversation={activeConversation} onSendMessage={handleSendMessage} />
          </>
        )}

        {/* STATUS TAB */}
        {activeTab === 'status' && (
          <>
            <StatusSidebar myStatus={myStatus} />
            <StatusView myStatus={myStatus} onSetStatus={setMyStatus} conversations={conversations} />
          </>
        )}

        {/* CONTACTS TAB (NEW) */}
        {activeTab === 'contacts' && (
          <>
            <ContactsSidebar />
            <ContactsView />
          </>
        )}
      </div>

      <CreateGroupModal
        isOpen={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        onGroupCreated={() => setRefreshKey((prev) => prev + 1)}
      />
    </div>
  );
}