'use client';

import { useState } from 'react';
import { MyStatus } from '@/app/page';

type StatusViewProps = {
  myStatus: MyStatus;
  onSetStatus: (status: MyStatus) => void;
};

export default function StatusView({ myStatus, onSetStatus }: StatusViewProps) {
  const [showTextModal, setShowTextModal] = useState(false);
  const [textInput, setTextInput] = useState('');

  const handleSaveText = () => {
    if (textInput.trim()) {
      onSetStatus({ type: 'text', content: textInput });
      setShowTextModal(false);
      setTextInput('');
    }
  };

  const handleFakeImageUpload = () => {
    // In a real app, this would open a file input. 
    // Here we simulate uploading an image by setting a placeholder URL.
    onSetStatus({ 
      type: 'image', 
      content: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1000&auto=format&fit=crop' 
    });
  };

  return (
    <div className="flex flex-1 flex-col bg-[#222e35] items-center justify-center relative">
      
      {/* Top Right Menu Icon */}
      <div className="absolute top-4 right-4 text-wa-muted cursor-pointer hover:text-wa-text">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
      </div>

      <div className="flex flex-col items-center max-w-sm text-center">
        {/* Large Circle Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-[#364147]">
          <div className="h-10 w-10 rounded-full border-4 border-[#364147]"></div>
        </div>
        
        <h1 className="mb-2 text-[28px] font-light text-wa-text">Share statuses</h1>
        <p className="mb-8 text-[14px] text-wa-muted">
          Share photos, videos and text that disappear after 24 hours.
        </p>

        <div className="flex gap-4">
          {/* Text Status Button */}
          <button 
            onClick={() => setShowTextModal(true)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#364147] text-wa-text group-hover:bg-[#4a5c65] transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </div>
            <span className="text-[13px] text-wa-text">Text status</span>
          </button>

          {/* Photo & Video Button */}
          <button 
            onClick={handleFakeImageUpload}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#364147] text-wa-text group-hover:bg-[#4a5c65] transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <span className="text-[13px] text-wa-text">Photo and video</span>
          </button>
        </div>
      </div>

      {/* Text Status Modal */}
      {showTextModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-[400px] rounded-lg bg-wa-panel p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-medium text-wa-text">Add Text Status</h2>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your status here..."
              className="h-32 w-full resize-none rounded-lg bg-wa-search p-3 text-wa-text focus:outline-none focus:ring-1 focus:ring-wa-green placeholder:text-wa-muted"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button 
                onClick={() => setShowTextModal(false)}
                className="rounded-md px-4 py-2 text-sm text-wa-text hover:bg-wa-hover"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveText}
                className="rounded-md bg-wa-green px-4 py-2 text-sm font-medium text-black hover:bg-[#00c298]"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If you want to see what you uploaded, we could show it here, 
          but WhatsApp usually shows the empty state until you click your own status */}
      {myStatus.type && (
        <div className="absolute bottom-10 flex items-center justify-center rounded-full bg-[#005c4b] px-6 py-2 text-sm text-white shadow-lg">
          Your status has been added! Check "My status" on the left.
        </div>
      )}
    </div>
  );
}