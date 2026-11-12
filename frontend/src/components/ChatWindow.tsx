'use client';

import { Conversation } from '@/lib/mock-data';

type ChatWindowProps = {
  conversation: Conversation | null;
};

export default function ChatWindow({ conversation }: ChatWindowProps) {
  if (!conversation) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#222e35]">
        <p className="text-wa-muted">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col wa-chat-bg"> {/* Applied the WhatsApp Background here */}
      
      {/* Chat Header */}
      <div className="flex h-[60px] items-center justify-between bg-wa-panel px-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 font-medium text-white">
            {conversation.avatarInitials}
          </div>
          <div>
            <h2 className="text-[16px] text-wa-text">{conversation.name}</h2>
            <p className="text-xs text-wa-muted">online</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-wa-muted">
           {/* Video Icon */}
           <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/></svg>
           {/* Call Icon */}
           <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.2-.6-2.4-.6-3.6 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2a9 9 0 00-9-9v2c3.9 0 7 3.1 7 7zm-4 0h2c0-2.8-2.2-5-5-5v2c1.7 0 3 1.3 3 3z"/></svg>
           {/* Menu Icon */}
           <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {/* Date Pill */}
        <div className="flex justify-center mb-4">
          <span className="rounded-lg bg-[#182229] px-3 py-1 text-xs text-[#8696a0] uppercase shadow-sm">
            Today
          </span>
        </div>

        {conversation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative max-w-[75%] rounded-lg px-3 py-1.5 shadow-sm ${
                msg.sender === 'me'
                  ? 'rounded-tr-none bg-wa-lightGreen text-wa-text' // Outgoing
                  : 'rounded-tl-none bg-wa-incoming text-wa-text'   // Incoming
              }`}
            >
              <p className="text-[14.2px] leading-[19px]">{msg.text}</p>
              <div className={`mt-1 flex items-center justify-end gap-1 text-[11px] ${msg.sender === 'me' ? 'text-[#8696a0]' : 'text-[#8696a0]'}`}>
                <span>{msg.timestamp}</span>
                {msg.sender === 'me' && (
                  // Double checkmark icon
                  <svg className="h-[15px] w-[15px] text-[#53bdeb]" fill="currentColor" viewBox="0 0 16 15">
                    <path d="M15.01 3.316l-.478-.372a.365.365 0 00-.51.063L8.666 9.879a.32.32 0 01-.484.033l-.358-.325a.319.319 0 00-.484.032l-.378.483a.418.418 0 00.036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 00-.064-.512zm-4.1 0l-.478-.372a.365.365 0 00-.51.063L4.566 9.879a.32.32 0 01-.484.033L1.891 7.769a.366.366 0 00-.515.006l-.423.433a.364.364 0 00.006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 00-.063-.51z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2 bg-wa-panel px-4 py-2.5">
        {/* Emoji Icon */}
        <button type="button" className="p-1.5 text-wa-muted hover:text-wa-text">
           <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
        </button>
        {/* Attach Icon */}
        <button type="button" className="p-1.5 text-wa-muted hover:text-wa-text">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
        </button>

        <form className="flex flex-1 items-center" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Type a message"
            className="w-full rounded-lg bg-wa-search px-3 py-2 text-[15px] text-wa-text focus:outline-none placeholder:text-wa-muted"
          />
        </form>

        {/* Mic Icon */}
        <button type="submit" className="p-1.5 text-wa-muted hover:text-wa-text">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
        </button>
      </div>
    </div>
  );
}