export type StatusUpdate = {
  id: string;
  name: string;
  avatarInitials: string;
  time: string;
  isViewed: boolean;
};

export const mockStatuses: StatusUpdate[] = [
  { id: '1', name: 'FADHILI Mayai', avatarInitials: 'FM', time: 'Today at 17:13', isViewed: false },
  { id: '2', name: 'Mr KIST', avatarInitials: 'MK', time: 'Today at 16:08', isViewed: false },
  { id: '3', name: 'ALLY SUDI', avatarInitials: 'AS', time: 'Today at 00:11', isViewed: false },
  { id: '4', name: 'Bill_Gedion', avatarInitials: 'BG', time: 'Yesterday at 23:59', isViewed: false },
  { id: '5', name: 'BONGO MEMES😂', avatarInitials: 'BM', time: 'Yesterday at 23:06', isViewed: false },
  { id: '6', name: 'Chief Vipochi(@Amani Kyando)', avatarInitials: 'CV', time: 'Today at 12:43', isViewed: true },
  { id: '7', name: 'Dianarthony', avatarInitials: 'DA', time: 'Today at 10:15', isViewed: true },
];