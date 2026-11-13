'use client';

type NavRailProps = {
  activeTab: 'chats' | 'status' | 'contacts';
  onTabChange: (tab: 'chats' | 'status' | 'contacts') => void;
};

export default function NavRail({ activeTab, onTabChange }: NavRailProps) {
  return (
    <div className="flex h-full w-[64px] flex-col items-center justify-between border-r border-wa-border bg-[#111b21] py-4">
      <div className="flex flex-col items-center gap-6">

        {/* Chats Icon */}
        <button
          onClick={() => onTabChange('chats')}
          className={`relative transition-colors ${activeTab === 'chats' ? 'text-wa-text' : 'text-wa-muted hover:text-wa-text'}`}
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8z" />
          </svg>
          <span className="absolute -right-3 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-wa-green px-1 text-[10px] font-bold text-black border-2 border-[#111b21]">
            99+
          </span>
        </button>

        {/* Calls Icon */}
        <button className="text-wa-muted hover:text-wa-text">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>

        {/* Status Icon */}
        <button
          onClick={() => onTabChange('status')}
          className={`relative transition-colors ${activeTab === 'status' ? 'text-wa-text' : 'text-wa-muted hover:text-wa-text'}`}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {activeTab !== 'status' && (
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-wa-green border border-[#111b21]"></span>
          )}
        </button>

        {/* Communities Icon */}
        <button className="relative text-wa-muted hover:text-wa-text">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-wa-green border border-[#111b21]"></span>
        </button>

        {/* Contacts Icon (NEW) */}
        <button
          onClick={() => onTabChange('contacts')}
          className={`relative transition-colors ${activeTab === 'contacts' ? 'text-wa-text' : 'text-wa-muted hover:text-wa-text'}`}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>

        {/* Channels Icon */}
        <button className="text-wa-muted hover:text-wa-text mt-2">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 text-wa-muted">
        <button className="hover:text-wa-text">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <button className="h-8 w-8 overflow-hidden rounded-full border border-wa-muted hover:border-wa-text mt-2">
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="h-full w-full object-cover" />
        </button>
      </div>
    </div>
  );
}