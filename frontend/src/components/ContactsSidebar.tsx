'use client';

import { useState, useEffect } from 'react';
import { ApiUser, fetchAllUsers } from '@/services/api';

export default function ContactsSidebar() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllUsers()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="w-[400px] border-r border-wa-border p-4 text-wa-muted">Loading contacts...</div>;
  }

  return (
    <div className="flex h-full w-[400px] flex-col border-r border-wa-border bg-wa-panel">
      {/* Header */}
      <div className="flex h-[60px] items-center justify-between px-4">
        <h1 className="text-[22px] font-semibold text-wa-text">Contacts</h1>
        <div className="flex items-center gap-5 text-wa-muted">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-wa-green text-black hover:bg-[#00c298]">
            <svg className="h-6 w-6 font-bold" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-3 pb-2">
        <div className="flex items-center rounded-lg bg-wa-search px-3 py-1.5">
          <svg className="h-4 w-4 text-wa-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search contacts" className="ml-3 w-full bg-transparent text-sm text-wa-text focus:outline-none placeholder:text-wa-muted" />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <div key={user.id} className="flex cursor-pointer items-center gap-3 border-b border-wa-border px-4 py-3 hover:bg-wa-hover">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-600 font-medium text-white">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <h2 className="text-[16px] text-wa-text">{user.name}</h2>
              <p className="truncate text-[14px] text-wa-muted">{user.role === 'ADMIN' ? 'Admin' : user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}