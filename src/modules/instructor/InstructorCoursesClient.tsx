'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  PlusCircle, Search, Eye, Edit, Trash2, MoreVertical,
  Star, Users, DollarSign, Filter, ArrowUpDown, BookOpen,
  TrendingUp, TrendingDown, CheckCircle, Clock, Archive
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { mockCourses } from '@/lib/mock-data';
import { formatPrice, formatNumber, formatRelativeTime, cn } from '@/lib/utils';

type SortKey = 'title' | 'students' | 'rating' | 'revenue' | 'lastUpdated';
type StatusFilter = 'all' | 'published' | 'draft' | 'pending' | 'archived';

export function InstructorCoursesClient() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('students');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const courses = mockCourses
    .filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;
      switch (sortKey) {
        case 'title': aVal = a.title; bVal = b.title; break;
        case 'students': aVal = a.studentCount; bVal = b.studentCount; break;
        case 'rating': aVal = a.rating; bVal = b.rating; break;
        case 'revenue': aVal = a.price * a.studentCount; bVal = b.price * b.studentCount; break;
        case 'lastUpdated': aVal = a.lastUpdated; bVal = b.lastUpdated; break;
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const statusCounts = {
    all: mockCourses.length,
    published: mockCourses.filter(c => c.status === 'published').length,
    draft: mockCourses.filter(c => c.status === 'draft').length,
    pending: mockCourses.filter(c => c.status === 'pending').length,
    archived: 0,
  };

  const SortHeader = ({ label, sortId }: { label: string; sortId: SortKey }) => (
    <button
      onClick={() => handleSort(sortId)}
      className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors group"
    >
      {label}
      <ArrowUpDown size={11} className={cn('transition-colors', sortKey === sortId ? 'text-primary' : 'text-muted-foreground/40 group-hover:text-muted-foreground')} />
    </button>
  );

  // Summary metrics
  const totalRevenue = mockCourses.reduce((acc, c) => acc + (c.price * c.studentCount * 0.7), 0);
  const totalStudents = mockCourses.reduce((acc, c) => acc + c.studentCount, 0);
  const avgRating = mockCourses.reduce((acc, c) => acc + c.rating, 0) / mockCourses.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">My Courses</h2>
          <p className="text-muted-foreground mt-1">Manage and track all your courses</p>
        </div>
        <Link href="/instructor/create"
          className="flex items-center gap-2 px-5 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          <PlusCircle size={15} /> New Course
        </Link>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Courses', value: mockCourses.length, icon: BookOpen, color: 'text-indigo-500 bg-indigo-500/10' },
          { label: 'Total Students', value: formatNumber(totalStudents), icon: Users, color: 'text-purple-500 bg-purple-500/10' },
          { label: 'Avg Rating', value: avgRating.toFixed(1), icon: Star, color: 'text-yellow-500 bg-yellow-500/10' },
          { label: 'Total Earnings', value: `$${(totalRevenue / 1000).toFixed(0)}k`, icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10' },
        ].map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3"
          >
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', color)}>
              <Icon size={17} />
            </div>
            <div>
              <p className="text-xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full h-10 pl-9 pr-4 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div className="flex gap-1 p-1 bg-accent rounded-xl self-start overflow-x-auto">
          {(Object.entries(statusCounts) as [StatusFilter, number][]).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-all',
                statusFilter === status ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {status} <span className="opacity-60">({count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/40">
                <th className="text-left px-5 py-3.5 w-2/5">
                  <SortHeader label="Course" sortId="title" />
                </th>
                <th className="text-left px-5 py-3.5">Status</th>
                <th className="text-left px-5 py-3.5">
                  <SortHeader label="Students" sortId="students" />
                </th>
                <th className="text-left px-5 py-3.5">
                  <SortHeader label="Rating" sortId="rating" />
                </th>
                <th className="text-left px-5 py-3.5">
                  <SortHeader label="Revenue" sortId="revenue" />
                </th>
                <th className="text-left px-5 py-3.5">
                  <SortHeader label="Updated" sortId="lastUpdated" />
                </th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-muted-foreground">
                    <BookOpen size={28} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No courses match your filters</p>
                  </td>
                </tr>
              ) : (
                courses.map((course, i) => {
                  const revenue = course.price * course.studentCount * 0.7;
                  const prevRevenue = revenue * 0.85;
                  const revenueGrowth = ((revenue - prevRevenue) / prevRevenue) * 100;

                  return (
                    <motion.tr
                      key={course.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/50 last:border-0 hover:bg-accent/30 transition-colors group"
                    >
                      {/* Course */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-10 rounded-xl overflow-hidden shrink-0">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                              {course.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">{course.category} · {course.level}</p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <Badge
                          variant={
                            course.status === 'published' ? 'success' :
                            course.status === 'draft' ? 'secondary' :
                            course.status === 'pending' ? 'warning' : 'outline'
                          }
                        >
                          {course.status === 'published' && <CheckCircle size={10} className="mr-1" />}
                          {course.status === 'draft' && <Archive size={10} className="mr-1" />}
                          {course.status === 'pending' && <Clock size={10} className="mr-1" />}
                          {course.status}
                        </Badge>
                      </td>

                      {/* Students */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Users size={13} className="text-muted-foreground" />
                          <span className="font-medium">{formatNumber(course.studentCount)}</span>
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Star size={13} className="text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{course.rating}</span>
                          <span className="text-xs text-muted-foreground">({formatNumber(course.reviewCount)})</span>
                        </div>
                      </td>

                      {/* Revenue */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-sm">{formatPrice(revenue)}</p>
                          <div className={cn('flex items-center gap-1 text-xs mt-0.5',
                            revenueGrowth > 0 ? 'text-emerald-500' : 'text-red-500')}>
                            {revenueGrowth > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            <span>{revenueGrowth > 0 ? '+' : ''}{revenueGrowth.toFixed(0)}% MoM</span>
                          </div>
                        </div>
                      </td>

                      {/* Updated */}
                      <td className="px-5 py-4 text-xs text-muted-foreground">
                        {new Date(course.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/courses/${course.slug}`}
                            className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                            <Eye size={14} />
                          </Link>
                          <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                            <Edit size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {courses.length > 0 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Showing {courses.length} of {mockCourses.length} courses
            </p>
            <div className="flex gap-1">
              {[1, 2, 3].map(p => (
                <button
                  key={p}
                  className={cn(
                    'w-8 h-8 rounded-lg text-xs font-medium transition-colors',
                    p === 1 ? 'gradient-bg text-white' : 'hover:bg-accent text-muted-foreground'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
