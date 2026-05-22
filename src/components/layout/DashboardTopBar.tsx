'use client';

import { Bell, Search } from 'lucide-react';
import { mockCurrentUser, mockNotifications } from '@/lib/mock-data';

interface Props { title: string; }

export function DashboardTopBar({ title }: Props) {
  const unread = mockNotifications.filter(n => !n.read).length;
  return (
    <header className="h-16 border-b border-border bg-card/50 flex items-center justify-between px-6 shrink-0">
      <div>
        <h1 className="text-base font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all">
          <Search size={16} />
        </button>
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all relative">
          <Bell size={16} />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <img src={mockCurrentUser.avatar} alt={mockCurrentUser.name}
            className="w-7 h-7 rounded-lg border border-border bg-accent" />
          <span className="text-sm font-medium hidden sm:block">{mockCurrentUser.name}</span>
        </div>
      </div>
    </header>
  );
}
