'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Award, Clock, TrendingUp, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { DashboardCard } from '@/components/shared/DashboardCard';
import { ProgressBar, CircularProgress } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { mockEnrollments, mockCurrentUser, mockNotifications } from '@/lib/mock-data';
import { formatRelativeTime, truncate } from '@/lib/utils';

export function StudentDashboardClient() {
  const inProgress = mockEnrollments.filter(e => e.progress < 100);
  const completed = mockEnrollments.filter(e => e.progress === 100);
  const totalHours = 47;
  const avgProgress = Math.round(mockEnrollments.reduce((acc, e) => acc + e.progress, 0) / mockEnrollments.length);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold">
          Good morning, {mockCurrentUser.name.split(' ')[0]} 👋
        </h2>
        <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening with your learning today.</p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Enrolled Courses" value={mockEnrollments.length}
          icon={BookOpen} color="indigo" change={0} index={0} />
        <DashboardCard title="Completed" value={completed.length}
          icon={Award} color="emerald" change={100} index={1} />
        <DashboardCard title="Hours Learned" value={`${totalHours}h`}
          icon={Clock} color="purple" change={12} changeLabel="vs last week" index={2} />
        <DashboardCard title="Avg Progress" value={`${avgProgress}%`}
          icon={TrendingUp} color="cyan" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue learning */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Continue Learning</h3>
            <Link href="/dashboard/courses" className="text-sm text-primary flex items-center gap-1 hover:underline">
              View all <ArrowRight size={13} />
            </Link>
          </div>

          {inProgress.map((enrollment, i) => (
            <motion.div
              key={enrollment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 hover:shadow-lg transition-all group"
            >
              <div className="flex gap-4">
                <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0">
                  <img src={enrollment.course.thumbnail} alt={enrollment.course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm leading-snug line-clamp-1">
                      {enrollment.course.title}
                    </h4>
                    <Badge variant={enrollment.progress >= 75 ? 'success' : 'default'} size="sm">
                      {enrollment.progress}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                    {enrollment.course.instructor.name}
                  </p>
                  <ProgressBar value={enrollment.progress} size="sm" animated />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">
                      Last accessed {formatRelativeTime(enrollment.lastAccessedAt)}
                    </span>
                    <Link href={`/dashboard/learning/${enrollment.courseId}`}
                      className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                      <Play size={11} fill="currentColor" /> Continue
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {inProgress.length === 0 && (
            <div className="text-center py-12 bg-card border border-border rounded-2xl">
              <BookOpen size={32} className="text-muted-foreground mx-auto mb-3" />
              <h4 className="font-semibold mb-1">No courses in progress</h4>
              <p className="text-sm text-muted-foreground mb-4">Start learning something new today</p>
              <Link href="/courses" className="inline-flex items-center gap-2 px-5 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl">
                Browse Courses <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Overall progress */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold text-sm mb-4">Overall Progress</h3>
            <div className="flex items-center justify-center mb-4">
              <CircularProgress value={avgProgress} size={96} />
            </div>
            <div className="space-y-2.5">
              {mockEnrollments.map(e => (
                <div key={e.id} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-xs text-muted-foreground truncate flex-1">{truncate(e.course.title, 28)}</span>
                  <span className="text-xs font-semibold">{e.progress}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold text-sm mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {mockNotifications.slice(0, 3).map(n => (
                <div key={n.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    n.type === 'success' ? 'bg-emerald-500' : n.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="text-xs font-medium">{n.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{n.message}</p>
                    <p className="text-[10px] text-muted-foreground/70 mt-0.5">{formatRelativeTime(n.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed certificates */}
          {completed.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-sm mb-3">Certificates Earned</h3>
              {completed.map(e => (
                <div key={e.id} className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <Award size={15} className="text-yellow-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{e.course.title}</p>
                    <p className="text-[10px] text-muted-foreground">{e.completedAt && new Date(e.completedAt).toLocaleDateString()}</p>
                  </div>
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
