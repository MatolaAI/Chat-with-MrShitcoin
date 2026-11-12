'use client';

import { useState, useRef, useEffect } from 'react';
import { Conversation } from '@/lib/mock-data';

type ChatWindowProps = {
  conversation: Conversation | null;
  onSendMessage: (text: string) => void;
};

const COMMON_EMOJIS = ['😀', '😂', '🥰', '😎', '😭', '👍', '🙏', '🔥', '💚', '🎉', '💯', '🤔'];

export default function ChatWindow({ conversation, onSendMessage }: ChatWindowProps) {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  
  // Voice Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const headerMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
        setShowAttachMenu(false);
      }
      if (headerMenuRef.current && !headerMenuRef.current.contains(event.target as Node)) {
        setShowHeaderMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recording Timer Logic
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

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
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emoji: string) => {
    setInputText((prev) => prev + emoji);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendVoiceNote = () => {
    if (recordingTime < 1) {
      // If they click and release immediately, cancel instead of sending a 0s voice note
      setIsRecording(false);
      return;
    }
    onSendMessage(`Voice message (${formatTime(recordingTime)})`);
    setIsRecording(false);
  };

  return (
    <div className="flex flex-1 flex-col wa-chat-bg relative">
      
      {/* Chat Header */}
      <div className="flex h-[60px] items-center justify-between bg-wa-panel px-4 border-l border-wa-border z-20">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 font-medium text-white">
            {conversation.isGroup ? (
                <svg className="h-5 w-5 text-wa-muted" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              ) : (
                conversation.avatarInitials
              )}
          </div>
          <div>
            <h2 className="text-[16px] text-wa-text truncate max-w-[400px]">{conversation.name}</h2>
            <p className="text-xs text-wa-muted truncate max-w-[400px]">
              {conversation.isGroup 
                ? conversation.description || "Group" 
                : "online"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-wa-muted relative">
           <svg className="h-6 w-6 cursor-pointer hover:text-wa-text" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
           <svg className="h-6 w-6 cursor-pointer hover:text-wa-text" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
           <svg className="h-6 w-6 cursor-pointer hover:text-wa-text" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           
           {/* 3 Dots Menu Button */}
           <div ref={headerMenuRef}>
             <svg 
               onClick={() => setShowHeaderMenu(!showHeaderMenu)}
               className="h-6 w-6 cursor-pointer hover:text-wa-text" 
               fill="currentColor" 
               viewBox="0 0 24 24"
             >
               <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
             </svg>

             {/* Header Dropdown Menu */}
             {showHeaderMenu && (
               <div className="absolute right-0 top-10 w-[220px] rounded-md bg-wa-panel py-1.5 shadow-xl border border-wa-border flex flex-col z-50 text-wa-text">
                 <button className="flex items-center gap-4 px-5 py-2.5 text-[14px] hover:bg-wa-hover text-left">
                   <svg className="h-5 w-5 text-wa-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   {conversation.isGroup ? 'Group info' : 'Contact info'}
                 </button>
                 <button className="flex items-center gap-4 px-5 py-2.5 text-[14px] hover:bg-wa-hover text-left">
                   <svg className="h-5 w-5 text-wa-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                   Search
                 </button>
                 <button className="flex items-center gap-4 px-5 py-2.5 text-[14px] hover:bg-wa-hover text-left">
                   <svg className="h-5 w-5 text-wa-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   Select messages
                 </button>
                 <button className="flex items-center gap-4 px-5 py-2.5 text-[14px] hover:bg-wa-hover text-left">
                   <svg className="h-5 w-5 text-wa-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                   Mute notifications
                 </button>
                 <button className="flex items-center gap-4 px-5 py-2.5 text-[14px] hover:bg-wa-hover text-left">
                   <svg className="h-5 w-5 text-wa-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   Disappearing messages
                 </button>
                 <button className="flex items-center gap-4 px-5 py-2.5 text-[14px] hover:bg-wa-hover text-left">
                   <svg className="h-5 w-5 text-wa-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                   Add to favourites
                 </button>
                 <button className="flex items-center gap-4 px-5 py-2.5 text-[14px] hover:bg-wa-hover text-left">
                   <svg className="h-5 w-5 text-wa-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                   Add to list
                 </button>
                 <button className="flex items-center gap-4 px-5 py-2.5 text-[14px] hover:bg-wa-hover text-left">
                   <svg className="h-5 w-5 text-wa-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                   Export chat
                 </button>
                 <button className="flex items-center gap-4 px-5 py-2.5 text-[14px] hover:bg-wa-hover text-left">
                   <svg className="h-5 w-5 text-wa-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   Close chat
                 </button>
                 <button className="flex items-center gap-4 px-5 py-2.5 text-[14px] hover:bg-wa-hover text-left">
                   <svg className="h-5 w-5 text-wa-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                   Clear chat
                 </button>
                 {conversation.isGroup && (
                   <button className="flex items-center gap-4 px-5 py-2.5 text-[14px] hover:bg-wa-hover text-left text-red-500">
                     <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                     Exit group
                   </button>
                 )}
               </div>
             )}
           </div>
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
              {conversation.isGroup && msg.sender === 'them' && msg.senderName && (
                <p className="text-[13px] font-medium text-[#53bdeb] mb-0.5">{msg.senderName}</p>
              )}
              
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

      {/* Input Area & Menus (Admin Lock or Normal Input) */}
      {conversation.adminOnly ? (
        <div className="bg-wa-panel px-4 py-4 relative z-10 flex justify-center border-t border-wa-border">
          <p className="text-[14px] text-wa-muted flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Only admins can send messages in this group
          </p>
        </div>
      ) : (
        <div className="bg-wa-panel px-4 py-2.5 relative z-10 flex items-center" ref={menuRef}>
          
          {/* Voice Recording Interface */}
          {isRecording ? (
             <div className="flex w-full items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
               <div className="flex items-center gap-4 flex-1 text-red-500">
                 <button onClick={() => setIsRecording(false)} className="p-1.5 hover:text-red-400">
                   <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                 </button>
                 <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                 <span className="font-mono text-lg text-wa-text">{formatTime(recordingTime)}</span>
                 <span className="text-sm text-wa-muted ml-2">Recording...</span>
               </div>
               
               <button 
                 onClick={handleSendVoiceNote}
                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wa-green text-black hover:bg-[#00c298] transition-colors"
               >
                 <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                 </svg>
               </button>
             </div>
          ) : (
            <form className="flex w-full items-center gap-2" onSubmit={handleSubmit}>
              
              <div className="relative">
                {/* Emoji Button */}
                <button 
                  type="button" 
                  onClick={() => {
                    setShowEmojiPicker(!showEmojiPicker);
                    setShowAttachMenu(false);
                  }}
                  className="p-1.5 text-wa-muted hover:text-wa-text"
                >
                   <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
                </button>

                {/* Emoji Popup Menu */}
                {showEmojiPicker && (
                  <div className="absolute bottom-12 left-0 z-50 w-64 rounded-lg bg-wa-panel p-2 shadow-xl border border-wa-border flex flex-wrap gap-2">
                    {COMMON_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleEmojiClick(emoji)}
                        className="text-2xl hover:bg-wa-hover p-1 rounded transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                {/* Attach Button */}
                <button 
                  type="button" 
                  onClick={() => {
                    setShowAttachMenu(!showAttachMenu);
                    setShowEmojiPicker(false);
                  }}
                  className="p-1.5 text-wa-muted hover:text-wa-text"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
                </button>

                {/* Attach Popup Menu */}
                {showAttachMenu && (
                  <div className="absolute bottom-12 left-0 z-50 w-48 rounded-lg bg-wa-panel py-2 shadow-xl border border-wa-border flex flex-col">
                    <button type="button" className="flex items-center gap-3 px-4 py-2 text-sm text-wa-text hover:bg-wa-hover text-left">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#bf59cf] text-white">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z"/></svg>
                      </span>
                      Photos & Videos
                    </button>
                    <button type="button" className="flex items-center gap-3 px-4 py-2 text-sm text-wa-text hover:bg-wa-hover text-left">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5157ae] text-white">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                      </span>
                      Document
                    </button>
                    <button type="button" className="flex items-center gap-3 px-4 py-2 text-sm text-wa-text hover:bg-wa-hover text-left">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007bfc] text-white">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      </span>
                      Location
                    </button>
                  </div>
                )}
              </div>

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
                <button 
                  type="submit" 
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wa-green text-black hover:bg-[#00c298] transition-colors"
                >
                  <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={() => setIsRecording(true)} // Start recording here
                  className="p-1.5 text-wa-muted hover:text-wa-text transition-colors"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                </button>
              )}

            </form>
          )}
        </div>
      )}
    </div>
  );
}