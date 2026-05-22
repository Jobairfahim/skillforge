'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  BookOpen, FileText, Layout, Settings, CheckCircle,
  Upload, Plus, Trash2, GripVertical, ArrowRight, ArrowLeft, Rocket
} from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { mockCategories } from '@/lib/mock-data';

const steps = [
  { id: 1, label: 'Basics', icon: BookOpen, description: 'Course info & details' },
  { id: 2, label: 'Content', icon: Layout, description: 'Curriculum structure' },
  { id: 3, label: 'Media', icon: FileText, description: 'Thumbnail & preview' },
  { id: 4, label: 'Pricing', icon: Settings, description: 'Price & publish' },
];

const step1Schema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  shortDescription: z.string().min(20, 'Short description must be at least 20 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  category: z.string().min(1, 'Please select a category'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'All Levels']),
  language: z.string().min(1, 'Please enter a language'),
});

type Step1Data = z.infer<typeof step1Schema>;

interface CurriculumLesson { id: string; title: string; duration: string; type: 'video' | 'article' | 'quiz'; }
interface CurriculumSection { id: string; title: string; lessons: CurriculumLesson[]; }

export function CreateCourseClient() {
  const [currentStep, setCurrentStep] = useState(1);
  const [sections, setSections] = useState<CurriculumSection[]>([
    { id: 's1', title: 'Getting Started', lessons: [
      { id: 'l1', title: 'Introduction', duration: '5:00', type: 'video' },
    ]},
  ]);
  const [price, setPrice] = useState('89.99');
  const [originalPrice, setOriginalPrice] = useState('199.99');
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript']);
  const [newTag, setNewTag] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [outcomes, setOutcomes] = useState(['', '']);

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { level: 'Beginner', language: 'English' },
  });

  const addSection = () => {
    setSections(prev => [...prev, { id: `s${Date.now()}`, title: 'New Section', lessons: [] }]);
  };
  const removeSection = (id: string) => setSections(prev => prev.filter(s => s.id !== id));
  const addLesson = (sectionId: string) => {
    setSections(prev => prev.map(s => s.id === sectionId ? {
      ...s,
      lessons: [...s.lessons, { id: `l${Date.now()}`, title: 'New Lesson', duration: '10:00', type: 'video' }]
    } : s));
  };
  const removeLesson = (sectionId: string, lessonId: string) => {
    setSections(prev => prev.map(s => s.id === sectionId ? {
      ...s, lessons: s.lessons.filter(l => l.id !== lessonId)
    } : s));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(p => [...p, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      const valid = await trigger();
      if (!valid) return;
    }
    setCurrentStep(s => Math.min(s + 1, 4));
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsPublishing(false);
    setPublished(true);
  };

  if (published) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
          <CheckCircle size={36} className="text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Course Published! 🎉</h2>
        <p className="text-muted-foreground mb-8 max-w-sm">Your course is live and ready for students. Time to spread the word!</p>
        <div className="flex gap-3">
          <Button onClick={() => window.location.href = '/instructor/courses'}>View My Courses</Button>
          <Button variant="outline" onClick={() => { setPublished(false); setCurrentStep(1); }}>Create Another</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Create a New Course</h2>
        <p className="text-muted-foreground mt-1">Share your knowledge with the world</p>
      </div>

      {/* Step indicator */}
      <div className="mb-10">
        <div className="flex items-center gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;
            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                  className={cn('flex flex-col items-center gap-1.5', step.id < currentStep ? 'cursor-pointer' : 'cursor-default')}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
                    isCompleted ? 'gradient-bg text-white shadow-lg shadow-primary/20' :
                    isActive ? 'bg-primary/10 text-primary border-2 border-primary' :
                    'bg-card border border-border text-muted-foreground'
                  )}>
                    {isCompleted ? <CheckCircle size={16} /> : <Icon size={16} />}
                  </div>
                  <div className="hidden sm:block text-center">
                    <p className={cn('text-xs font-semibold', isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground')}>
                      {step.label}
                    </p>
                  </div>
                </button>
                {i < steps.length - 1 && (
                  <div className={cn('flex-1 h-0.5 mx-2 transition-colors', currentStep > step.id ? 'bg-primary' : 'bg-border')} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="bg-card border border-border rounded-2xl p-6 lg:p-8"
        >
          {/* Step 1: Basics */}
          {currentStep === 1 && (
            <form className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Course Basics</h3>
                <p className="text-sm text-muted-foreground">The foundation of your course</p>
              </div>
              <Input label="Course Title" placeholder="e.g. Complete React 19 & Next.js 15 Masterclass"
                error={errors.title?.message} {...register('title')} />
              <Input label="Short Description" placeholder="One-line hook for your course (shown in listings)"
                error={errors.shortDescription?.message} {...register('shortDescription')} />
              <Textarea label="Full Description" rows={5}
                placeholder="Describe what students will learn, who it's for, and what they'll build..."
                error={errors.description?.message} {...register('description')} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Category</label>
                  <select {...register('category')}
                    className="w-full h-10 px-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                    <option value="">Select category</option>
                    {mockCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  {errors.category && <p className="text-xs text-destructive mt-1">{errors.category.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Level</label>
                  <select {...register('level')}
                    className="w-full h-10 px-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                    {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              {/* Learning outcomes */}
              <div>
                <label className="block text-sm font-medium mb-2">Learning Outcomes</label>
                <div className="space-y-2">
                  {outcomes.map((o, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={o} onChange={e => setOutcomes(prev => prev.map((x, j) => j === i ? e.target.value : x))}
                        placeholder={`What students will be able to do #${i + 1}`}
                        className="flex-1 h-10 px-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                      {outcomes.length > 2 && (
                        <button type="button" onClick={() => setOutcomes(p => p.filter((_, j) => j !== i))}
                          className="p-2 text-muted-foreground hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => setOutcomes(p => [...p, ''])}
                    className="flex items-center gap-2 text-sm text-primary font-medium hover:underline mt-1">
                    <Plus size={14} /> Add outcome
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg border border-primary/20">
                      {tag}
                      <button onClick={() => setTags(p => p.filter(t => t !== tag))} className="hover:text-red-500 transition-colors">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={newTag} onChange={e => setNewTag(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add a tag (e.g. React)" className="flex-1 h-9 px-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  <button type="button" onClick={addTag} className="px-3 h-9 text-sm font-medium border border-border rounded-xl hover:bg-accent transition-colors">Add</button>
                </div>
              </div>
            </form>
          )}

          {/* Step 2: Curriculum */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Course Curriculum</h3>
                  <p className="text-sm text-muted-foreground">Build your course structure</p>
                </div>
                <button onClick={addSection}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-dashed border-primary/40 text-primary rounded-xl hover:bg-primary/5 transition-colors">
                  <Plus size={14} /> Add Section
                </button>
              </div>

              {sections.map((section, si) => (
                <div key={section.id} className="border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 p-3 bg-accent/50">
                    <GripVertical size={16} className="text-muted-foreground cursor-grab" />
                    <input value={section.title}
                      onChange={e => setSections(p => p.map(s => s.id === section.id ? { ...s, title: e.target.value } : s))}
                      className="flex-1 bg-transparent text-sm font-semibold focus:outline-none" />
                    <button onClick={() => removeSection(section.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="p-2 space-y-1">
                    {section.lessons.map(lesson => (
                      <div key={lesson.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent group">
                        <GripVertical size={13} className="text-muted-foreground cursor-grab" />
                        <input value={lesson.title}
                          onChange={e => setSections(p => p.map(s => s.id === section.id ? {
                            ...s, lessons: s.lessons.map(l => l.id === lesson.id ? { ...l, title: e.target.value } : l)
                          } : s))}
                          className="flex-1 bg-transparent text-sm focus:outline-none" />
                        <select value={lesson.type} onChange={e => setSections(p => p.map(s => s.id === section.id ? {
                          ...s, lessons: s.lessons.map(l => l.id === lesson.id ? { ...l, type: e.target.value as any } : l)
                        } : s))}
                          className="text-xs bg-background border border-border rounded-lg px-2 py-1 focus:outline-none">
                          <option value="video">Video</option>
                          <option value="article">Article</option>
                          <option value="quiz">Quiz</option>
                        </select>
                        <button onClick={() => removeLesson(section.id, lesson.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addLesson(section.id)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-xs text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors">
                      <Plus size={12} /> Add lesson
                    </button>
                  </div>
                </div>
              ))}

              {sections.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                  <Layout size={28} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No sections yet</p>
                  <button onClick={addSection} className="mt-3 text-sm text-primary font-medium hover:underline">
                    + Add your first section
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Media */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Course Media</h3>
                <p className="text-sm text-muted-foreground">Add visuals to attract students</p>
              </div>

              {/* Thumbnail upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Course Thumbnail</label>
                <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer">
                  <Upload size={28} className="text-muted-foreground mx-auto mb-3" />
                  <p className="font-medium text-sm">Drag & drop your thumbnail here</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WebP · 1280×720 recommended</p>
                  <button className="mt-4 px-5 py-2.5 border border-border text-sm font-medium rounded-xl hover:bg-accent transition-colors">
                    Browse Files
                  </button>
                </div>
              </div>

              {/* Preview video */}
              <div>
                <label className="block text-sm font-medium mb-2">Preview Video <span className="text-muted-foreground font-normal text-xs">(optional)</span></label>
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer">
                  <Upload size={24} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Upload a 2-5 minute preview of your course</p>
                  <p className="text-xs text-muted-foreground mt-1">MP4 format · Max 500MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Pricing */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Pricing & Publishing</h3>
                <p className="text-sm text-muted-foreground">Set your price and go live</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Sale Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <input value={price} onChange={e => setPrice(e.target.value)}
                      className="w-full h-10 pl-7 pr-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Original Price <span className="text-muted-foreground font-normal text-xs">(strikethrough)</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <input value={originalPrice} onChange={e => setOriginalPrice(e.target.value)}
                      className="w-full h-10 pl-7 pr-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="p-5 bg-accent/50 rounded-2xl border border-border">
                <h4 className="text-sm font-semibold mb-3">Preview: How students will see it</h4>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold">${price}</span>
                  <span className="text-lg text-muted-foreground line-through">${originalPrice}</span>
                  {price && originalPrice && Number(originalPrice) > Number(price) && (
                    <Badge variant="error">{Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100)}% OFF</Badge>
                  )}
                </div>
              </div>

              {/* Publish options */}
              <div className="space-y-3">
                {[
                  { id: 'published', label: 'Publish immediately', desc: 'Students can enroll right away' },
                  { id: 'draft', label: 'Save as draft', desc: 'Come back and publish later' },
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-4 p-4 border border-border rounded-xl cursor-pointer hover:bg-accent transition-colors">
                    <input type="radio" name="publish" defaultChecked={opt.id === 'published'} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentStep(s => Math.max(s - 1, 1))}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border rounded-xl hover:bg-accent disabled:opacity-40 disabled:pointer-events-none transition-all"
        >
          <ArrowLeft size={15} /> Previous
        </button>

        {currentStep < 4 ? (
          <Button onClick={handleNextStep} rightIcon={<ArrowRight size={15} />}>
            Continue to {steps[currentStep].label}
          </Button>
        ) : (
          <Button onClick={handlePublish} loading={isPublishing} leftIcon={<Rocket size={15} />}>
            Publish Course
          </Button>
        )}
      </div>
    </div>
  );
}
