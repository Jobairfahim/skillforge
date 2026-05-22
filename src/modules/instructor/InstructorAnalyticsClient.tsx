'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { TrendingUp, Users, Star, Eye, Clock, Award, ArrowUp, ArrowDown } from 'lucide-react';
import { mockRevenueData, mockCategoryStats } from '@/lib/mock-data';
import { formatNumber, formatPrice, cn } from '@/lib/utils';

const engagementData = [
  { name: 'Mon', views: 420, completions: 85, enrollments: 32 },
  { name: 'Tue', views: 380, completions: 72, enrollments: 28 },
  { name: 'Wed', views: 510, completions: 98, enrollments: 45 },
  { name: 'Thu', views: 460, completions: 88, enrollments: 38 },
  { name: 'Fri', views: 540, completions: 112, enrollments: 52 },
  { name: 'Sat', views: 620, completions: 130, enrollments: 61 },
  { name: 'Sun', views: 490, completions: 95, enrollments: 42 },
];

const retentionData = [
  { lesson: 'L1', retention: 100 },
  { lesson: 'L2', retention: 92 },
  { lesson: 'L3', retention: 87 },
  { lesson: 'L4', retention: 81 },
  { lesson: 'L5', retention: 75 },
  { lesson: 'L6', retention: 71 },
  { lesson: 'L7', retention: 68 },
  { lesson: 'L8', retention: 65 },
  { lesson: 'L9', retention: 62 },
  { lesson: 'L10', retention: 59 },
];

const radarData = [
  { subject: 'Engagement', A: 85 },
  { subject: 'Completion', A: 72 },
  { subject: 'Rating', A: 98 },
  { subject: 'Reviews', A: 68 },
  { subject: 'Revenue', A: 88 },
  { subject: 'Growth', A: 76 },
];

const topCountries = [
  { country: '🇺🇸 United States', students: 18420, pct: 44 },
  { country: '🇮🇳 India', students: 9840, pct: 23 },
  { country: '🇬🇧 United Kingdom', students: 4200, pct: 10 },
  { country: '🇩🇪 Germany', students: 2800, pct: 7 },
  { country: '🇨🇦 Canada', students: 2100, pct: 5 },
  { country: '🌍 Other', students: 4640, pct: 11 },
];

type Period = '7d' | '30d' | '90d' | '1y';

export function InstructorAnalyticsClient() {
  const [period, setPeriod] = useState<Period>('30d');

  const kpis = [
    { label: 'Total Views', value: '184.2k', change: +18, icon: Eye, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Avg Watch Time', value: '38m', change: +5, icon: Clock, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Completion Rate', value: '68%', change: -2, icon: Award, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'New Reviews', value: '342', change: +24, icon: Star, color: 'text-yellow-500 bg-yellow-500/10' },
    { label: 'New Students', value: formatNumber(4280), change: +31, icon: Users, color: 'text-indigo-500 bg-indigo-500/10' },
    { label: 'Revenue Growth', value: '+31%', change: +31, icon: TrendingUp, color: 'text-cyan-500 bg-cyan-500/10' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p className="text-muted-foreground mt-1">Deep insights into your course performance</p>
        </div>
        <div className="flex gap-1 p-1 bg-accent rounded-xl">
          {(['7d', '30d', '90d', '1y'] as Period[]).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={cn('px-3 py-1.5 text-xs font-semibold rounded-lg transition-all',
                period === p ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground')}>
              {p}
            </button>
          ))}
        </div>
      </motion.div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map(({ label, value, change, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', color)}>
                <Icon size={16} />
              </div>
              <div className={cn('flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg',
                change >= 0 ? 'text-emerald-600 bg-emerald-500/10' : 'text-red-500 bg-red-500/10')}>
                {change >= 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                {Math.abs(change)}%
              </div>
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold mb-1">Weekly Engagement</h3>
          <p className="text-xs text-muted-foreground mb-5">Views, completions & enrollments</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={engagementData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                {[
                  { id: 'views', color: '#6366f1' },
                  { id: 'completions', color: '#10b981' },
                  { id: 'enrollments', color: '#f59e0b' },
                ].map(g => (
                  <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={g.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={g.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 10, fontSize: 11 }} />
              <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} fill="url(#views)" />
              <Area type="monotone" dataKey="completions" stroke="#10b981" strokeWidth={2} fill="url(#completions)" />
              <Area type="monotone" dataKey="enrollments" stroke="#f59e0b" strokeWidth={2} fill="url(#enrollments)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-3">
            {[
              { color: '#6366f1', label: 'Views' },
              { color: '#10b981', label: 'Completions' },
              { color: '#f59e0b', label: 'Enrollments' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Radar chart */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold mb-1">Performance Score</h3>
          <p className="text-xs text-muted-foreground mb-3">Course health overview</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
              <Radar name="Score" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-2 text-center">
            <p className="text-3xl font-bold gradient-text">81</p>
            <p className="text-xs text-muted-foreground">Overall health score</p>
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Retention curve */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold mb-1">Student Retention Curve</h3>
          <p className="text-xs text-muted-foreground mb-5">% of students completing each lesson</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={retentionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="lesson" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 }}
                formatter={(v: number) => [`${v}%`, 'Retention']} />
              <Line type="monotone" dataKey="retention" stroke="#6366f1" strokeWidth={2.5}
                dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-3">
            💡 <strong>Tip:</strong> Lesson 4 has the biggest drop. Consider adding a quiz or project there.
          </p>
        </div>

        {/* Geographic distribution */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold mb-1">Students by Country</h3>
          <p className="text-xs text-muted-foreground mb-5">Top geographic markets</p>
          <div className="space-y-3">
            {topCountries.map((c, i) => (
              <motion.div
                key={c.country}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3"
              >
                <span className="text-sm w-36 truncate">{c.country}</span>
                <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.06 }}
                    className="h-full rounded-full"
                    style={{ background: `hsl(${240 - i * 20}, 80%, 65%)` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-16 text-right">
                  {formatNumber(c.students)} ({c.pct}%)
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly revenue bars */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold">Revenue vs Enrollments</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Monthly comparison (2024)</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded bg-indigo-500" /> Revenue
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded bg-purple-400" /> Enrollments ×100
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockRevenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 }}
              formatter={(v: number, name: string) => [name === 'revenue' ? formatPrice(v) : v, name === 'revenue' ? 'Revenue' : 'Enrollments']} />
            <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="enrollments" fill="#a78bfa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
