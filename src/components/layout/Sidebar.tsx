'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, GraduationCap, Award, BarChart3,
  Settings, ChevronLeft, ChevronRight, Users, PlusCircle, 
  DollarSign, Shield, TrendingUp, FileText, Bell, Zap, HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const studentLinks: SidebarLink[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/courses', label: 'My Courses', icon: BookOpen, badge: 3 },
  { href: '/dashboard/learning', label: 'Learning Path', icon: TrendingUp },
  { href: '/dashboard/certificates', label: 'Certificates', icon: Award },
  { href: '/dashboard/notes', label: 'My Notes', icon: FileText },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell, badge: 2 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const instructorLinks: SidebarLink[] = [
  { href: '/instructor', label: 'Overview', icon: LayoutDashboard },
  { href: '/instructor/courses', label: 'My Courses', icon: BookOpen },
  { href: '/instructor/create', label: 'Create Course', icon: PlusCircle },
  { href: '/instructor/students', label: 'Students', icon: Users },
  { href: '/instructor/revenue', label: 'Revenue', icon: DollarSign },
  { href: '/instructor/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/instructor/settings', label: 'Settings', icon: Settings },
];

const adminLinks: SidebarLink[] = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/courses', label: 'Course Approval', icon: GraduationCap },
  { href: '/admin/revenue', label: 'Revenue', icon: DollarSign },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/security', label: 'Security', icon: Shield },
  { href: '/admin/settings', label: 'Platform Settings', icon: Settings },
];

interface SidebarProps {
  type?: 'student' | 'instructor' | 'admin';
}

export function Sidebar({ type = 'student' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const links = type === 'instructor' ? instructorLinks : type === 'admin' ? adminLinks : studentLinks;

  const sidebarTitle = {
    student: 'Student Portal',
    instructor: 'Instructor Hub',
    admin: 'Admin Panel',
  }[type];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex flex-col h-screen bg-card border-r border-border sticky top-0 shrink-0 overflow-hidden"
    >
      {/* Header */}
      <div className={cn('flex items-center h-16 border-b border-border px-4', collapsed ? 'justify-center' : 'justify-between')}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="text-sm font-semibold truncate">{sidebarTitle}</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all shrink-0"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/dashboard' && link.href !== '/instructor' && link.href !== '/admin' && pathname.startsWith(link.href));
          const Icon = link.icon;

          return (
            <Link key={link.href} href={link.href}>
              <div className={cn(
                'sidebar-link relative group',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                collapsed && 'justify-center px-0'
              )}>
                <Icon size={17} className="shrink-0" />
                {!collapsed && (
                  <span className="truncate text-sm">{link.label}</span>
                )}
                {!collapsed && link.badge && (
                  <span className="ml-auto text-[10px] font-bold bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
                {collapsed && link.badge && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                )}
                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-popover border border-border text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {link.label}
                  </div>
                )}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Help */}
      <div className="p-3 border-t border-border">
        <Link href="/help" className={cn(
          'sidebar-link text-muted-foreground hover:text-foreground hover:bg-accent',
          collapsed && 'justify-center px-0'
        )}>
          <HelpCircle size={17} />
          {!collapsed && <span className="text-sm">Help & Support</span>}
        </Link>
      </div>
    </motion.aside>
  );
}
