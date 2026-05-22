'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Play, CheckCircle, Lock, ChevronDown, ChevronUp, FileText,
  Video, HelpCircle, Download, MessageSquare, BookOpen, ArrowLeft,
  ThumbsUp, Settings, Volume2, Maximize, SkipForward
} from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { Course, Lesson } from '@/types';

interface Props { course: Course }

export function CourseLearningClient({ course }: Props) {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(
    course.sections[0]?.lessons[0] ?? null
  );
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(['l1', 'l2']));
  const [openSections, setOpenSections] = useState<Set<string>>(new Set([course.sections[0]?.id]));
  const [activeTab, setActiveTab] = useState<'notes' | 'resources' | 'comments'>('notes');
  const [note, setNote] = useState('');

  const totalLessons = course.sections.reduce((a, s) => a + s.lessons.length, 0);
  const progress = Math.round((completedLessons.size / Math.max(totalLessons, 1)) * 100);

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const markComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={13} />;
      case 'quiz': return <HelpCircle size={13} className="text-yellow-500" />;
      case 'article': return <FileText size={13} className="text-green-500" />;
      default: return <BookOpen size={13} />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <div className="h-14 border-b border-border bg-card/50 flex items-center justify-between px-4 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={15} /> <span className="hidden sm:block">Dashboard</span>
          </Link>
          <div className="flex-1 max-w-md mx-4">
            <p className="text-sm font-semibold truncate text-center">{course.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:block">{progress}% complete</span>
            <div className="w-24 hidden sm:block">
              <ProgressBar value={progress} size="sm" animated={false} />
            </div>
          </div>
        </div>

        {/* Video player */}
        <div className="bg-black aspect-video w-full relative flex items-center justify-center shrink-0 max-h-[60vh]">
          {activeLesson ? (
            <>
              {/* Mock video player */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center mb-4 mx-auto hover:bg-white/20 cursor-pointer transition-all">
                    <Play size={28} fill="white" className="ml-1" />
                  </div>
                  <p className="text-sm text-white/80 max-w-xs">{activeLesson.title}</p>
                  <p className="text-xs text-white/50 mt-1">{activeLesson.duration}</p>
                </div>
              </div>

              {/* Player controls bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer">
                  <div className="h-full w-1/3 bg-primary rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="text-white hover:text-primary transition-colors"><Play size={16} fill="white" /></button>
                    <button className="text-white hover:text-primary transition-colors"><SkipForward size={16} /></button>
                    <button className="text-white hover:text-primary transition-colors"><Volume2 size={16} /></button>
                    <span className="text-white/60 text-xs">0:00 / {activeLesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-white hover:text-primary transition-colors"><Settings size={15} /></button>
                    <button className="text-white hover:text-primary transition-colors"><Maximize size={15} /></button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-white/50 text-center">
              <BookOpen size={40} className="mx-auto mb-2" />
              <p>Select a lesson to start</p>
            </div>
          )}
        </div>

        {/* Lesson info + tabs */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 border-b border-border">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">{activeLesson?.title ?? 'Select a lesson'}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{course.instructor.name}</p>
              </div>
              {activeLesson && (
                <button
                  onClick={() => markComplete(activeLesson.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all shrink-0',
                    completedLessons.has(activeLesson.id)
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'gradient-bg text-white hover:opacity-90'
                  )}
                >
                  <CheckCircle size={15} />
                  {completedLessons.has(activeLesson.id) ? 'Completed' : 'Mark Complete'}
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <div className="flex px-5">
              {(['notes', 'resources', 'comments'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors',
                    activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5">
            {activeTab === 'notes' && (
              <div>
                <p className="text-sm text-muted-foreground mb-3">Add notes for this lesson</p>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Type your notes here..."
                  rows={6}
                  className="w-full bg-background border border-border rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <button className="mt-2 px-4 py-2 gradient-bg text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                  Save Note
                </button>
              </div>
            )}
            {activeTab === 'resources' && (
              <div className="space-y-2">
                {['Starter Files.zip', 'Slides PDF.pdf', 'Code Repository.link'].map(r => (
                  <div key={r} className="flex items-center justify-between p-3 bg-card border border-border rounded-xl hover:bg-accent transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText size={15} className="text-primary" />
                      <span className="text-sm font-medium">{r}</span>
                    </div>
                    <button className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline">
                      <Download size={12} /> Download
                    </button>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'comments' && (
              <div>
                <div className="flex gap-3 mb-6">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1"
                    className="w-8 h-8 rounded-lg border border-border bg-accent shrink-0" alt="" />
                  <div className="flex-1">
                    <textarea placeholder="Ask a question or leave a comment..."
                      rows={3} className="w-full bg-background border border-border rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    <button className="mt-2 px-4 py-2 gradient-bg text-white text-xs font-medium rounded-lg">Post</button>
                  </div>
                </div>
                {[
                  { name: 'Alex K.', comment: 'This section is really helpful! I was confused about the useEffect cleanup but now it makes sense.', likes: 12 },
                  { name: 'Maria L.', comment: 'Is there a way to achieve this without the useCallback hook?', likes: 5 },
                ].map((c, i) => (
                  <div key={i} className="flex gap-3 py-4 border-b border-border last:border-0">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name}`}
                      className="w-8 h-8 rounded-lg border border-border bg-accent shrink-0" alt="" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{c.name}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{c.comment}</p>
                      <button className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2 hover:text-foreground transition-colors">
                        <ThumbsUp size={11} /> {c.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Curriculum sidebar */}
      <div className="w-80 border-l border-border bg-card flex flex-col hidden lg:flex shrink-0">
        <div className="p-4 border-b border-border">
          <h3 className="font-bold text-sm">Course Content</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">{completedLessons.size}/{totalLessons} lessons</span>
            <span className="text-xs font-semibold text-primary">{progress}%</span>
          </div>
          <ProgressBar value={progress} size="sm" className="mt-2" />
        </div>
        <div className="flex-1 overflow-y-auto">
          {course.sections.map((section) => (
            <div key={section.id} className="border-b border-border">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-accent transition-colors text-left"
              >
                <span className="text-xs font-semibold">{section.title}</span>
                {openSections.has(section.id)
                  ? <ChevronUp size={13} className="text-muted-foreground shrink-0" />
                  : <ChevronDown size={13} className="text-muted-foreground shrink-0" />
                }
              </button>
              {openSections.has(section.id) && (
                <div>
                  {section.lessons.map(lesson => {
                    const isCompleted = completedLessons.has(lesson.id);
                    const isActive = activeLesson?.id === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent transition-colors text-left',
                          isActive && 'bg-primary/5 border-r-2 border-primary'
                        )}
                      >
                        <div className="shrink-0">
                          {isCompleted ? (
                            <CheckCircle size={15} className="text-emerald-500" />
                          ) : (
                            <div className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center',
                              isActive ? 'border-primary bg-primary/10' : 'border-border'
                            )}>
                              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn('text-xs leading-snug', isActive ? 'font-semibold text-primary' : 'text-foreground')}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-muted-foreground">{typeIcon(lesson.type)}</span>
                            <span className="text-[10px] text-muted-foreground">{lesson.duration}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
