'use client';

import { motion } from 'framer-motion';
import { Award, Download, Share2, ExternalLink, Star, Zap } from 'lucide-react';
import { mockEnrollments } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const completedCourses = mockEnrollments.filter(e => e.progress === 100 && e.course.certificate);

function CertificateCard({ enrollment, index }: { enrollment: typeof completedCourses[0]; index: number }) {
  const gradients = [
    'from-indigo-500 via-purple-500 to-pink-500',
    'from-cyan-500 via-blue-500 to-indigo-500',
    'from-emerald-500 via-teal-500 to-cyan-500',
  ];
  const grad = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      {/* Certificate visual */}
      <div className={cn(
        'relative rounded-2xl p-px overflow-hidden shadow-2xl',
        `bg-gradient-to-br ${grad}`
      )}>
        <div className="relative bg-card rounded-[calc(1rem-1px)] overflow-hidden">
          {/* Certificate header decoration */}
          <div className={cn('h-2 w-full bg-gradient-to-r', grad)} />

          <div className="p-8">
            {/* Top row */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
                  <Zap size={15} className="text-white" />
                </div>
                <span className="text-sm font-bold">SkillForge</span>
              </div>
              <div className="flex items-center gap-1.5 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
            </div>

            {/* Certificate body */}
            <div className="text-center mb-8">
              <div className={cn(
                'w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4',
                `bg-gradient-to-br ${grad}`
              )}>
                <Award size={28} className="text-white" />
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium mb-2">
                Certificate of Completion
              </p>
              <p className="text-base text-muted-foreground mb-3">This certifies that</p>
              <p className="text-2xl font-bold mb-3">Alex Johnson</p>
              <p className="text-sm text-muted-foreground mb-3">has successfully completed</p>
              <h3 className="text-lg font-bold leading-snug mb-4 max-w-xs mx-auto">
                {enrollment.course.title}
              </h3>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <img
                  src={enrollment.course.instructor.avatar}
                  alt=""
                  className="w-6 h-6 rounded-full border border-border"
                />
                <span>Instructed by <strong>{enrollment.course.instructor.name}</strong></span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Issued on</p>
                <p className="text-xs font-semibold">
                  {enrollment.completedAt
                    ? new Date(enrollment.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                    : 'October 15, 2024'
                  }
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Credential ID</p>
                <p className="text-xs font-mono font-semibold text-primary">SF-{enrollment.id.toUpperCase()}-2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-3">
        <button className="flex-1 flex items-center justify-center gap-2 h-9 text-xs font-semibold border border-border rounded-xl hover:bg-accent transition-colors">
          <Download size={13} /> Download PDF
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 h-9 text-xs font-semibold border border-border rounded-xl hover:bg-accent transition-colors">
          <Share2 size={13} /> Share
        </button>
        <button className="h-9 w-9 flex items-center justify-center border border-border rounded-xl hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
          <ExternalLink size={13} />
        </button>
      </div>
    </motion.div>
  );
}

function EmptyCertificates() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-24 bg-card border border-dashed border-border rounded-2xl"
    >
      <div className="w-20 h-20 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-5">
        <Award size={36} className="text-yellow-500" />
      </div>
      <h3 className="text-xl font-bold mb-2">No certificates yet</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
        Complete a course to earn your first certificate. You're closer than you think!
      </p>
      <a
        href="/dashboard/courses"
        className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
      >
        Continue Learning
      </a>
    </motion.div>
  );
}

export function CertificatesClient() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-yellow-500/10 flex items-center justify-center">
            <Award size={18} className="text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold">My Certificates</h2>
        </div>
        <p className="text-muted-foreground mt-1 ml-12">
          {completedCourses.length > 0
            ? `You've earned ${completedCourses.length} certificate${completedCourses.length !== 1 ? 's' : ''}. Keep going!`
            : 'Complete courses to earn verifiable certificates'}
        </p>
      </motion.div>

      {/* Stats bar */}
      {completedCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: 'Certificates Earned', value: completedCourses.length, icon: Award, color: 'text-yellow-500 bg-yellow-500/10' },
            { label: 'Courses Completed', value: completedCourses.length, icon: Star, color: 'text-emerald-500 bg-emerald-500/10' },
            { label: 'Skills Verified', value: completedCourses.reduce((a, e) => a + e.course.tags.length, 0), icon: Zap, color: 'text-indigo-500 bg-indigo-500/10' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', color)}>
                <Icon size={16} />
              </div>
              <div>
                <p className="text-lg font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Certificates grid */}
      {completedCourses.length === 0 ? (
        <EmptyCertificates />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedCourses.map((enrollment, i) => (
            <CertificateCard key={enrollment.id} enrollment={enrollment} index={i} />
          ))}
        </div>
      )}

      {/* LinkedIn prompt */}
      {completedCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 p-5 bg-[#0077b5]/10 border border-[#0077b5]/20 rounded-2xl"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0077b5] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">in</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Add to LinkedIn Profile</p>
            <p className="text-xs text-muted-foreground">Showcase your certificates and boost your professional profile</p>
          </div>
          <button className="px-4 py-2 text-xs font-semibold bg-[#0077b5] text-white rounded-xl hover:bg-[#0077b5]/90 transition-colors shrink-0">
            Add Certificates
          </button>
        </motion.div>
      )}
    </div>
  );
}
