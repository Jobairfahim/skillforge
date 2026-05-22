'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Play, Award, RotateCcw, BookOpen, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { mockEnrollments } from '@/lib/mock-data';
import { cn, formatRelativeTime } from '@/lib/utils';

type FilterTab = 'all' | 'in-progress' | 'completed';

export function DashboardCoursesClient() {
  const [filter, setFilter] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');

  const filtered = mockEnrollments.filter(e => {
    const matchSearch = e.course.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ||
      (filter === 'in-progress' && e.progress < 100) ||
      (filter === 'completed' && e.progress === 100);
    return matchSearch && matchFilter;
  });

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'All Courses', count: mockEnrollments.length },
    { key: 'in-progress', label: 'In Progress', count: mockEnrollments.filter(e => e.progress < 100).length },
    { key: 'completed', label: 'Completed', count: mockEnrollments.filter(e => e.progress === 100).length },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold">My Courses</h2>
        <p className="text-muted-foreground mt-1">{mockEnrollments.length} courses enrolled</p>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search your courses..."
            className="w-full h-10 pl-9 pr-4 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <div className="flex gap-1 p-1 bg-accent rounded-xl self-start">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={cn(
                'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap',
                filter === tab.key
                  ? 'bg-card shadow text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
              <span className={cn(
                'ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold',
                filter === tab.key ? 'bg-primary/10 text-primary' : 'bg-border text-muted-foreground'
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Course cards */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-card border border-border rounded-2xl"
        >
          <BookOpen size={40} className="text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold mb-2">No courses found</h3>
          <p className="text-sm text-muted-foreground mb-5">
            {search ? `No results for "${search}"` : 'Start your learning journey today'}
          </p>
          <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-2.5 gradient-bg text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity">
            Browse Courses <ArrowRight size={14} />
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filtered.map((enrollment, i) => (
            <motion.div
              key={enrollment.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Thumbnail */}
                <div className="relative sm:w-56 h-36 sm:h-auto shrink-0">
                  <img
                    src={enrollment.course.thumbnail}
                    alt={enrollment.course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {enrollment.progress === 100 && (
                    <div className="absolute inset-0 bg-emerald-900/60 flex items-center justify-center">
                      <CheckCircle size={32} className="text-emerald-400" />
                    </div>
                  )}
                  {enrollment.progress < 100 && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <ProgressBar value={enrollment.progress} size="sm" animated={false} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col">
                  <div className="flex items-start gap-3 justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge variant="default" size="sm">{enrollment.course.category}</Badge>
                        {enrollment.progress === 100 && (
                          <Badge variant="success" size="sm">Completed</Badge>
                        )}
                        {enrollment.course.certificate && enrollment.progress === 100 && (
                          <Badge variant="warning" size="sm">
                            <Award size={10} className="mr-1" /> Certificate
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {enrollment.course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{enrollment.course.instructor.name}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-bold gradient-text">{enrollment.progress}%</div>
                      <div className="text-xs text-muted-foreground">complete</div>
                    </div>
                  </div>

                  <div className="flex-1" />

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        Last seen {formatRelativeTime(enrollment.lastAccessedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={12} />
                        {enrollment.completedLessons.length} lessons done
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {enrollment.progress === 100 ? (
                        <>
                          {enrollment.course.certificate && (
                            <Link
                              href={`/dashboard/certificates`}
                              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 rounded-xl hover:bg-yellow-500/20 transition-colors"
                            >
                              <Award size={12} /> View Certificate
                            </Link>
                          )}
                          <Link
                            href={`/dashboard/learning/${enrollment.courseId}`}
                            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border border-border rounded-xl hover:bg-accent transition-colors"
                          >
                            <RotateCcw size={12} /> Revisit
                          </Link>
                        </>
                      ) : (
                        <Link
                          href={`/dashboard/learning/${enrollment.courseId}`}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold gradient-bg text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                        >
                          <Play size={12} fill="white" /> Continue
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Discover more */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden bg-card border border-border rounded-2xl p-8 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />
        <div className="relative z-10">
          <h3 className="font-bold text-lg mb-2">Explore 1,200+ more courses</h3>
          <p className="text-sm text-muted-foreground mb-5">Keep the momentum going. Find your next skill to master.</p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 text-sm"
          >
            Browse All Courses <ArrowRight size={15} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
