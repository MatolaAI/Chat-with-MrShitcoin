'use client';

import { useState } from 'react';
import { Conversation } from '@/lib/mock-data';

type ChatWindowProps = {
  conversation: Conversation | null;
  onSendMessage: (text: string) => void;
};

export default function ChatWindow({ conversation, onSendMessage }: ChatWindowProps) {
  const [inputText, setInputText] = useState('');

  if (!conversation) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#222e35]">
        <p className="text-wa-muted">Select a conversation to start chatting</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-1 flex-col wa-chat-bg relative">
      
      {/* Chat Header */}
      <div className="flex h-[60px] items-center justify-between bg-wa-panel px-4 border-l border-wa-border z-10">
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
           {/* Header Icons (Video, Call, Search, Menu) */}
           <svg className="h-6 w-6 cursor-pointer hover:text-wa-text" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
           <svg className="h-6 w-6 cursor-pointer hover:text-wa-text" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
           <svg className="h-6 w-6 cursor-pointer hover:text-wa-text" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           <svg className="h-6 w-6 cursor-pointer hover:text-wa-text" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 relative z-10">
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
                  ? 'rounded-tr-none bg-[#005c4b] text-[#e9edef]'
                  : 'rounded-tl-none bg-[#202c33] text-[#e9edef]'
              }`}
            >
              <p className="text-[14.2px] leading-[19px]">{msg.text}</p>
              <div className={`mt-1 flex items-center justify-end gap-1 text-[11px] text-[#8696a0]`}>
                <span>{msg.timestamp}</span>
                {msg.sender === 'me' && (
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
      <div className="bg-wa-panel px-4 py-2.5 relative z-10 flex items-center">
        <form className="flex w-full items-center gap-2" onSubmit={handleSubmit}>
          
          {/* Emoji Icon */}
          <button type="button" className="p-1.5 text-wa-muted hover:text-wa-text">
             <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
          </button>
          
          {/* Attach Icon */}
          <button type="button" className="p-1.5 text-wa-muted hover:text-wa-text">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
          </button>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Type a message"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 rounded-lg bg-wa-search px-3 py-2 text-[15px] text-wa-text focus:outline-none placeholder:text-wa-muted"
          />

          {/* Dynamic Mic / Send Button */}
          {inputText.trim() ? (
            // Green Send Button
            <button 
              type="submit" 
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wa-green text-black hover:bg-[#00c298] transition-colors"
            >
              <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          ) : (
            // Mic Button
            <button type="button" className="p-1.5 text-wa-muted hover:text-wa-text">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
            </button>
          )}

        </form>
      </div>
    </div>
  );
}