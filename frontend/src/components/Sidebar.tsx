'use client';

import { Conversation } from '@/lib/mock-data';

type SidebarProps = {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export default function Sidebar({ conversations, activeId, onSelect }: SidebarProps) {
  return (
    <div className="flex h-full w-[400px] flex-col border-r border-wa-border bg-wa-panel">
      
      {/* Sidebar Header */}
      <div className="flex h-[60px] items-center justify-between px-4">
        <h1 className="text-[22px] font-semibold text-wa-text">Chat-with-MrShitcoin</h1>
        <div className="flex items-center gap-5 text-wa-muted">
          {/* Menu Icon */}
          <svg className="h-6 w-6 cursor-pointer hover:text-wa-text" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
          
          {/* Green Plus Button */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-wa-green text-black hover:bg-[#00c298]">
            <svg className="h-6 w-6 font-bold" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-3 pb-2">
        <div className="flex items-center rounded-lg bg-wa-search px-3 py-1.5">
          <svg className="h-4 w-4 text-wa-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search or start a new chat" className="ml-3 w-full bg-transparent text-sm text-wa-text focus:outline-none placeholder:text-wa-muted" />
        </div>
      </div>

      {/* Filter Pills - Matching the screenshot exactly */}
      <div className="flex items-center gap-2 px-3 pb-3 text-[13px] text-wa-text">
        <button className="rounded-full bg-[#103529] px-3 py-1 text-[#00a884]">All</button>
        <button className="rounded-full border border-[#2a3942] px-3 py-1 text-wa-muted hover:bg-[#202c33]">Favourites</button>
        <button className="rounded-full border border-[#2a3942] px-3 py-1 text-wa-muted hover:bg-[#202c33]">Unread 120</button>
        <button className="rounded-full border border-[#2a3942] px-3 py-1 text-wa-muted hover:bg-[#202c33]">Groups 22</button>
        <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2a3942] text-wa-muted hover:bg-[#202c33]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`flex w-full items-center gap-3 border-b border-wa-border px-3 py-2.5 text-left transition-colors hover:bg-wa-hover ${
              activeId === chat.id ? 'bg-wa-hover' : ''
            }`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-600 font-medium text-white">
              {chat.avatarInitials}
            </div>
            <div className="flex-1 overflow-hidden border-b border-transparent">
              <div className="flex items-center justify-between">
                <span className="text-[16px] text-wa-text">{chat.name}</span>
                <span className={`text-xs ${chat.unreadCount > 0 ? 'text-wa-green font-medium' : 'text-wa-muted'}`}>
                  {chat.timestamp}
                </span>
              </div>
              <div className="mt-0.5 flex items-center justify-between">
                <span className="truncate text-[14px] text-wa-muted">{chat.lastMessage}</span>
                {chat.unreadCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-wa-green text-[11px] font-bold text-black">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}