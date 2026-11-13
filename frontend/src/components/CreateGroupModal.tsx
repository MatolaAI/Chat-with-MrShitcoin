'use client';

import { useState, useEffect } from 'react';
import { ApiUser, fetchAllUsers, ADMIN_USER_ID } from '@/services/api';

type CreateGroupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onGroupCreated: () => void; // Callback to refresh the sidebar
};

export default function CreateGroupModal({ isOpen, onClose, onGroupCreated }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAllUsers().then(setUsers).catch(console.error);
    }
  }, [isOpen]);

  const toggleUser = (id: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleCreate = async () => {
    if (!groupName.trim() || selectedUserIds.length === 0) return;
    setIsSubmitting(true);

    try {
      await fetch('http://localhost:3001/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'GROUP',
          title: groupName,
          description: 'Group created by Mr. Shitcoin',
          creatorId: ADMIN_USER_ID,
          participantIds: selectedUserIds,
        }),
      });

      setGroupName('');
      setSelectedUserIds([]);
      onGroupCreated(); // Refresh sidebar
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[500px] rounded-lg bg-wa-panel p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-medium text-wa-text">Create New Group</h2>
        
        <input
          type="text"
          placeholder="Group name (e.g., Shitcoin Masterclass)"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full rounded-lg bg-wa-search p-3 text-wa-text focus:outline-none focus:ring-1 focus:ring-wa-green mb-4 placeholder:text-wa-muted"
        />

        <p className="text-[13px] text-wa-muted mb-2">Select participants:</p>
        <div className="max-h-64 overflow-y-auto space-y-1 mb-4 bg-wa-search rounded-lg p-2 border border-wa-border">
          {users.filter(u => u.id !== ADMIN_USER_ID).map((user) => (
            <label key={user.id} className="flex items-center gap-3 p-2 hover:bg-wa-hover rounded cursor-pointer">
              <input
                type="checkbox"
                checked={selectedUserIds.includes(user.id)}
                onChange={() => toggleUser(user.id)}
                className="h-4 w-4 rounded accent-[#00a884]"
              />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-xs font-medium text-white">
                {user.name.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-[14px] text-wa-text">{user.name}</span>
              <span className="text-[11px] text-wa-muted ml-auto">{user.role}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="rounded-md px-4 py-2 text-sm text-wa-text hover:bg-wa-hover">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!groupName.trim() || selectedUserIds.length === 0 || isSubmitting}
            className="rounded-md bg-wa-green px-4 py-2 text-sm font-medium text-black hover:bg-[#00c298] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Group'}
          </button>
        </div>
      </div>
    </div>
  );
}