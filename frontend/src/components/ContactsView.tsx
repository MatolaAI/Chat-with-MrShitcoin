'use client';

export default function ContactsView() {
  return (
    <div className="flex flex-1 flex-col bg-[#222e35] items-center justify-center relative">
      <div className="flex flex-col items-center max-w-sm text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-[#364147]">
          <svg className="h-10 w-10 text-[#364147]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        </div>
        <h1 className="mb-2 text-[28px] font-light text-wa-text">Manage Contacts</h1>
        <p className="mb-8 text-[14px] text-wa-muted">
          Select a contact to start a direct chat, or manage group participants.
        </p>
      </div>
    </div>
  );
}