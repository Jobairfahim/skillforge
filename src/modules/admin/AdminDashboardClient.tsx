'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import {
  Users, BookOpen, DollarSign, TrendingUp,
  CheckCircle, XCircle, Clock, Eye, Ban, Search, Filter, Shield
} from 'lucide-react';
import { DashboardCard } from '@/components/shared/DashboardCard';
import { Badge } from '@/components/ui/Badge';
import { mockRevenueData, mockCourses, mockDashboardStats } from '@/lib/mock-data';
import { formatPrice, formatNumber, formatRelativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

const mockUsers = [
  { id: 'u1', name: 'Alex Johnson', email: 'alex@email.com', role: 'student', status: 'active', joinedAt: '2024-11-20T10:00:00', courses: 3 },
  { id: 'u2', name: 'Sarah Chen', email: 'sarah@email.com', role: 'instructor', status: 'active', joinedAt: '2024-11-18T09:00:00', courses: 8 },
  { id: 'u3', name: 'Marcus Johnson', email: 'marcus@email.com', role: 'instructor', status: 'active', joinedAt: '2024-11-15T14:00:00', courses: 12 },
  { id: 'u4', name: 'Emma Wilson', email: 'emma@email.com', role: 'student', status: 'suspended', joinedAt: '2024-11-10T11:00:00', courses: 1 },
  { id: 'u5', name: 'Carlos Rodriguez', email: 'carlos@email.com', role: 'student', status: 'active', joinedAt: '2024-11-08T16:00:00', courses: 5 },
];

const pendingCourses = mockCourses.slice(0, 3).map(c => ({ ...c, status: 'pending' as const }));

const platformStats = [
  { label: 'Page Views', data: mockRevenueData.map(d => ({ ...d, views: d.enrollments * 42 })) },
];

export function AdminDashboardClient() {
  const [userSearch, setUserSearch] = useState('');
  const [userFilter, setUserFilter] = useState<'all' | 'student' | 'instructor'>('all');
  const [activeTab, setActiveTab] = useState<'users' | 'courses' | 'revenue'>('users');

  const stats = mockDashboardStats;

  const filteredUsers = mockUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchRole = userFilter === 'all' || u.role === userFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center">
            <Shield size={16} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold">Admin Control Panel</h2>
        </div>
        <p className="text-muted-foreground ml-11">Platform overview & management</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Users" value={formatNumber(stats.totalStudents + 350)}
          icon={Users} color="indigo" change={18} index={0} />
        <DashboardCard title="Total Courses" value={stats.totalCourses + 180}
          icon={BookOpen} color="purple" change={stats.growth.courses} index={1} />
        <DashboardCard title="Platform Revenue" value={`$${(stats.totalRevenue * 1.3 / 1000).toFixed(0)}k`}
          icon={DollarSign} color="emerald" change={31} index={2} />
        <DashboardCard title="Pending Approvals" value={3}
          icon={Clock} color="orange" index={3} description="3 courses awaiting review" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold mb-1">Revenue Trend</h3>
          <p className="text-xs text-muted-foreground mb-5">Platform earnings (2024)</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={mockRevenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#adminRevGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold mb-1">New Enrollments</h3>
          <p className="text-xs text-muted-foreground mb-5">Monthly student sign-ups</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={mockRevenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 }} />
              <Line type="monotone" dataKey="enrollments" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Management tabs */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-border">
          {(['users', 'courses', 'revenue'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'flex-1 px-5 py-4 text-sm font-semibold capitalize transition-colors border-b-2',
                activeTab === tab ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {tab === 'users' ? `Users (${mockUsers.length})` : tab === 'courses' ? `Course Approvals (${pendingCourses.length})` : 'Revenue Breakdown'}
            </button>
          ))}
        </div>

        {/* Users tab */}
        {activeTab === 'users' && (
          <div>
            <div className="p-4 border-b border-border flex gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={userSearch} onChange={e => setUserSearch(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full h-9 pl-8 pr-3 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <div className="flex gap-1 p-1 bg-accent rounded-xl">
                {(['all', 'student', 'instructor'] as const).map(f => (
                  <button key={f} onClick={() => setUserFilter(f)}
                    className={cn('px-3 py-1 text-xs font-medium rounded-lg capitalize transition-all',
                      userFilter === f ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground')}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-accent/30">
                    {['User', 'Role', 'Status', 'Joined', 'Courses', 'Actions'].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, i) => (
                    <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      className="border-b border-border/50 last:border-0 hover:bg-accent/30 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt=""
                            className="w-8 h-8 rounded-lg bg-accent border border-border shrink-0" />
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant={user.role === 'instructor' ? 'default' : 'secondary'}>{user.role}</Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant={user.status === 'active' ? 'success' : 'error'}>{user.status}</Badge>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground text-xs">{formatRelativeTime(user.joinedAt)}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{user.courses}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"><Eye size={13} /></button>
                          <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"><Ban size={13} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Course approvals tab */}
        {activeTab === 'courses' && (
          <div>
            <div className="p-4 text-sm text-muted-foreground border-b border-border bg-yellow-500/5">
              ⚠️ {pendingCourses.length} courses are pending review. Please review and approve or reject.
            </div>
            <div className="divide-y divide-border">
              {pendingCourses.map((course, i) => (
                <motion.div key={course.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 p-5">
                  <img src={course.thumbnail} alt={course.title} className="w-16 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{course.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{course.instructor.name} · {course.category} · {course.level}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{formatPrice(course.price)} · {course.duration}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors">
                      <CheckCircle size={12} /> Approve
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors">
                      <XCircle size={12} /> Reject
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-accent transition-colors">
                      <Eye size={12} /> Preview
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Revenue tab */}
        {activeTab === 'revenue' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-accent/30">
                  {['Month', 'Gross Revenue', 'Net Revenue', 'Enrollments', 'Avg Order', 'Growth'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...mockRevenueData].reverse().map((row, i) => {
                  const net = row.revenue * 0.7;
                  const prev = mockRevenueData[mockRevenueData.length - 2 - i];
                  const growth = prev ? ((row.revenue - prev.revenue) / prev.revenue * 100) : 0;
                  return (
                    <tr key={row.month} className="border-b border-border/50 last:border-0 hover:bg-accent/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium">{row.month} 2024</td>
                      <td className="px-5 py-3.5">{formatPrice(row.revenue)}</td>
                      <td className="px-5 py-3.5 text-emerald-500 font-medium">{formatPrice(net)}</td>
                      <td className="px-5 py-3.5">{row.enrollments}</td>
                      <td className="px-5 py-3.5">{formatPrice(row.revenue / row.enrollments)}</td>
                      <td className="px-5 py-3.5">
                        {growth !== 0 && (
                          <span className={cn('text-xs font-semibold', growth > 0 ? 'text-emerald-500' : 'text-red-500')}>
                            {growth > 0 ? '+' : ''}{growth.toFixed(1)}%
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
