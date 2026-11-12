'use client';

import { mockStatuses } from '@/lib/status-mock-data';

export default function StatusSidebar() {
  const recentStatuses = mockStatuses.filter(s => !s.isViewed);
  const viewedStatuses = mockStatuses.filter(s => s.isViewed);

  return (
    <div className="flex h-full w-[400px] flex-col border-r border-wa-border bg-wa-panel">
      
      {/* Header */}
      <div className="flex h-[60px] items-center justify-between px-4">
        <h1 className="text-[22px] font-semibold text-wa-text">Status</h1>
        <div className="flex items-center gap-5 text-wa-muted">
          <svg className="h-5 w-5 cursor-pointer hover:text-wa-text" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-wa-muted hover:text-wa-text hover:border-wa-text">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* My Status */}
        <div className="flex cursor-pointer items-center gap-4 px-4 py-3 hover:bg-wa-hover">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-600 font-medium text-white">
             <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
             <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-wa-green text-black border-2 border-wa-panel">
               <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
             </span>
          </div>
          <div>
            <h2 className="text-[16px] text-wa-text">My status</h2>
            <p className="text-[13px] text-wa-muted">Click to add status update</p>
          </div>
        </div>

        {/* Recent Section */}
        <div className="px-4 py-2 mt-2">
          <h3 className="text-[13px] font-medium text-wa-muted">Recent</h3>
        </div>
        {recentStatuses.map((status) => (
          <div key={status.id} className="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-wa-hover">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-wa-green p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-600 text-sm font-medium text-white">
                {status.avatarInitials}
              </div>
            </div>
            <div>
              <h2 className="text-[16px] text-wa-text">{status.name}</h2>
              <p className="text-[13px] text-wa-muted">{status.time}</p>
            </div>
          </div>
        ))}

        {/* Viewed Section */}
        <div className="px-4 py-2 mt-4">
          <h3 className="text-[13px] font-medium text-wa-muted">Viewed</h3>
        </div>
        {viewedStatuses.map((status) => (
          <div key={status.id} className="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-wa-hover">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-wa-border p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-600 text-sm font-medium text-white">
                {status.avatarInitials}
              </div>
            </div>
            <div>
              <h2 className="text-[16px] text-wa-text">{status.name}</h2>
              <p className="text-[13px] text-wa-muted">{status.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}