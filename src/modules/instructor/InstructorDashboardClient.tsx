'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { DollarSign, Users, BookOpen, Star, PlusCircle, Eye, Edit, Trash2, MoreVertical, TrendingUp } from 'lucide-react';
import { DashboardCard } from '@/components/shared/DashboardCard';
import { Badge } from '@/components/ui/Badge';
import { mockRevenueData, mockCourses, mockCategoryStats, mockDashboardStats, mockInstructorUser } from '@/lib/mock-data';
import { formatPrice, formatNumber } from '@/lib/utils';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

export function InstructorDashboardClient() {
  const [revenueRange, setRevenueRange] = useState<'3m' | '6m' | '12m'>('6m');
  const stats = mockDashboardStats;

  const revenueSlice = revenueRange === '3m' ? mockRevenueData.slice(-3)
    : revenueRange === '6m' ? mockRevenueData.slice(-6) : mockRevenueData;

  const instructorCourses = mockCourses.slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Instructor Overview</h2>
          <p className="text-muted-foreground mt-1">Welcome back, {mockInstructorUser.name.split(' ')[0]}</p>
        </div>
        <Link href="/instructor/create"
          className="flex items-center gap-2 px-5 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl hover:opacity-90 shadow-lg shadow-primary/20 transition-opacity">
          <PlusCircle size={16} /> Create Course
        </Link>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Revenue" value={`$${(stats.totalRevenue / 1000).toFixed(0)}k`}
          icon={DollarSign} color="emerald" change={stats.growth.revenue} changeLabel="vs last month" index={0} />
        <DashboardCard title="Total Students" value={formatNumber(stats.totalStudents)}
          icon={Users} color="indigo" change={stats.growth.students} index={1} />
        <DashboardCard title="Active Courses" value={stats.totalCourses}
          icon={BookOpen} color="purple" change={stats.growth.courses} index={2} />
        <DashboardCard title="Avg Rating" value={stats.avgRating}
          icon={Star} color="orange" change={stats.growth.rating} index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold">Revenue Overview</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Monthly earnings & enrollments</p>
            </div>
            <div className="flex gap-1 p-1 bg-accent rounded-xl">
              {(['3m', '6m', '12m'] as const).map(r => (
                <button key={r} onClick={() => setRevenueRange(r)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${revenueRange === r ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueSlice} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }}
                formatter={(v: number, n: string) => [n === 'revenue' ? `$${v.toLocaleString()}` : v, n === 'revenue' ? 'Revenue' : 'Enrollments']} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revenueGrad)" />
              <Area type="monotone" dataKey="enrollments" stroke="#8b5cf6" strokeWidth={2} fill="url(#enrollGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold mb-1">Students by Category</h3>
          <p className="text-xs text-muted-foreground mb-4">Distribution across topics</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={mockCategoryStats} dataKey="students" nameKey="name" cx="50%" cy="50%" outerRadius={65} innerRadius={35}>
                {mockCategoryStats.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {mockCategoryStats.map((c, i) => (
              <div key={c.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-xs flex-1 truncate">{c.name}</span>
                <span className="text-xs font-semibold">{formatNumber(c.students)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course management table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-bold">Your Courses</h3>
          <Link href="/instructor/courses" className="text-xs text-primary font-medium hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/50">
                {['Course', 'Status', 'Students', 'Rating', 'Revenue', ''].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {instructorCourses.map((course, i) => (
                <motion.tr
                  key={course.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="border-b border-border/50 last:border-0 hover:bg-accent/50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={course.thumbnail} alt={course.title}
                        className="w-10 h-7 rounded-lg object-cover shrink-0" />
                      <span className="font-medium line-clamp-1 max-w-[200px]">{course.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={course.status === 'published' ? 'success' : course.status === 'draft' ? 'secondary' : 'warning'}>
                      {course.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{formatNumber(course.studentCount)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span>{course.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-semibold">{formatPrice(course.price * course.studentCount * 0.7)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                        <Eye size={13} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                        <Edit size={13} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-500">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom row: monthly bar chart */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-bold mb-1">Monthly Enrollments</h3>
        <p className="text-xs text-muted-foreground mb-5">Students enrolled per month (2024)</p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={mockRevenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="enrollments" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
