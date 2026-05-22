'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Star, Clock, Users, BarChart2, Globe, Award, CheckCircle,
  Play, ChevronDown, ChevronUp, FileText, Video, HelpCircle,
  ShoppingCart, Heart, Share2, BookOpen, ArrowLeft
} from 'lucide-react';
import { RatingStars } from '@/components/shared/RatingStars';
import { CourseCard } from '@/components/shared/CourseCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { mockCourses } from '@/lib/mock-data';
import { formatPrice, formatNumber, getDiscountPercentage } from '@/lib/utils';
import type { Course, Section } from '@/types';

function CurriculumSection({ section, index }: { section: Section; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const typeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={13} className="text-blue-500" />;
      case 'quiz': return <HelpCircle size={13} className="text-yellow-500" />;
      case 'article': return <FileText size={13} className="text-green-500" />;
      default: return <BookOpen size={13} />;
    }
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-accent transition-colors text-left"
      >
        <div>
          <span className="font-semibold text-sm">{section.title}</span>
          <span className="text-xs text-muted-foreground ml-3">
            {section.lessons.length} lessons · {section.duration}
          </span>
        </div>
        {open ? <ChevronUp size={16} className="text-muted-foreground shrink-0" /> : <ChevronDown size={16} className="text-muted-foreground shrink-0" />}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-t border-border"
        >
          {section.lessons.map(lesson => (
            <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors border-b border-border/50 last:border-0">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {typeIcon(lesson.type)}
                <span className="text-sm truncate">{lesson.title}</span>
                {lesson.isPreview && (
                  <Badge variant="success" size="sm">Preview</Badge>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {lesson.isPreview && (
                  <button className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                    <Play size={10} fill="currentColor" /> Play
                  </button>
                )}
                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export function CourseDetailClient({ course }: { course: Course }) {
  const [wishlist, setWishlist] = useState(false);
  const discount = course.originalPrice ? getDiscountPercentage(course.price, course.originalPrice) : 0;
  const related = mockCourses.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3);

  const totalLessons = course.sections.reduce((acc, s) => acc + s.lessons.length, 0);

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero banner */}
      <div className="bg-gray-950 dark:bg-gray-950 light:bg-gray-900 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="lg:max-w-3xl">
            <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={14} /> Back to courses
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="primary">{course.category}</Badge>
              {course.isBestseller && <Badge variant="warning">Bestseller</Badge>}
              {course.isNew && <Badge variant="success">New</Badge>}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {course.title}
            </h1>

            <p className="text-gray-300 text-base mb-6 leading-relaxed">{course.shortDescription}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-yellow-400">{course.rating}</span>
                <span>({formatNumber(course.reviewCount)} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={14} />
                <span>{formatNumber(course.studentCount)} students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart2 size={14} />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe size={14} />
                <span>{course.language}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img src={course.instructor.avatar} alt={course.instructor.name}
                className="w-9 h-9 rounded-xl border border-white/20 bg-gray-700" />
              <div>
                <p className="text-xs text-gray-400">Instructor</p>
                <p className="text-sm font-medium text-white">{course.instructor.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What you'll learn */}
            <section>
              <h2 className="text-xl font-bold mb-4">What you&apos;ll learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-6 bg-card border border-border rounded-2xl">
                {course.learningOutcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle size={15} className="text-primary mt-0.5 shrink-0" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Course Curriculum</h2>
                <span className="text-sm text-muted-foreground">{course.sections.length} sections · {totalLessons} lessons · {course.duration}</span>
              </div>
              <div className="space-y-2">
                {course.sections.length > 0 ? (
                  course.sections.map((section, i) => (
                    <CurriculumSection key={section.id} section={section} index={i} />
                  ))
                ) : (
                  <div className="text-center py-12 bg-card border border-border rounded-2xl">
                    <BookOpen size={32} className="text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Curriculum coming soon</p>
                  </div>
                )}
              </div>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {course.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructor */}
            <section>
              <h2 className="text-xl font-bold mb-4">About the Instructor</h2>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <img src={course.instructor.avatar} alt={course.instructor.name}
                    className="w-16 h-16 rounded-2xl border border-border bg-accent" />
                  <div>
                    <h3 className="font-bold text-lg">{course.instructor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{course.instructor.title}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Star size={13} className="text-yellow-400 fill-yellow-400" />
                        {course.instructor.rating} rating
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={13} className="text-primary" />
                        {formatNumber(course.instructor.students)} students
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={13} className="text-primary" />
                        {course.instructor.courses} courses
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{course.instructor.bio}</p>
              </div>
            </section>

            {/* Reviews */}
            {(course as any).reviews?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-6">Student Reviews</h2>
                <div className="flex items-start gap-6 mb-8 p-6 bg-card border border-border rounded-2xl">
                  <div className="text-center">
                    <p className="text-6xl font-bold gradient-text">{course.rating}</p>
                    <RatingStars rating={course.rating} className="justify-center mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Course Rating</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5,4,3,2,1].map(star => {
                      const pct = star === 5 ? 72 : star === 4 ? 20 : star === 3 ? 6 : star === 2 ? 1 : 1;
                      return (
                        <div key={star} className="flex items-center gap-3 text-xs">
                          <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-4">{star}</span>
                          <Star size={10} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-muted-foreground w-8">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  {(course as any).reviews.map((review: any) => (
                    <div key={review.id} className="p-5 bg-card border border-border rounded-2xl">
                      <div className="flex items-start gap-3 mb-3">
                        <img src={review.user.avatar} alt={review.user.name}
                          className="w-9 h-9 rounded-xl border border-border bg-accent" />
                        <div>
                          <p className="text-sm font-semibold">{review.user.name}</p>
                          <RatingStars rating={review.rating} size={12} className="mt-0.5" />
                        </div>
                        <span className="ml-auto text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky purchase card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Preview thumbnail */}
                <div className="relative aspect-video">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play size={22} className="text-white ml-1" fill="white" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="text-xs text-white/80 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                      Preview this course
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-bold">{formatPrice(course.price)}</span>
                    {course.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">{formatPrice(course.originalPrice)}</span>
                    )}
                    {discount > 0 && (
                      <Badge variant="error" size="sm">{discount}% OFF</Badge>
                    )}
                  </div>
                  {course.originalPrice && (
                    <p className="text-xs text-red-500 font-medium mb-4">🔥 Sale ends in 2 days</p>
                  )}

                  {/* CTA */}
                  <button className="w-full py-3.5 gradient-bg text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 mb-3 flex items-center justify-center gap-2">
                    <ShoppingCart size={16} />
                    Enroll Now
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWishlist(!wishlist)}
                      className={`flex-1 py-2.5 text-sm font-medium border rounded-xl flex items-center justify-center gap-2 transition-all ${wishlist ? 'border-primary/30 text-primary bg-primary/5' : 'border-border hover:bg-accent'}`}
                    >
                      <Heart size={14} fill={wishlist ? 'currentColor' : 'none'} />
                      Wishlist
                    </button>
                    <button className="flex-1 py-2.5 text-sm font-medium border border-border rounded-xl flex items-center justify-center gap-2 hover:bg-accent transition-all">
                      <Share2 size={14} />
                      Share
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-3">30-Day Money-Back Guarantee</p>

                  {/* Includes */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm font-semibold mb-3">This course includes:</p>
                    <ul className="space-y-2">
                      {[
                        { icon: Video, text: `${course.duration} on-demand video` },
                        { icon: FileText, text: `${totalLessons} lessons` },
                        { icon: Globe, text: 'Full lifetime access' },
                        ...(course.certificate ? [{ icon: Award, text: 'Certificate of completion' }] : []),
                      ].map(({ icon: Icon, text }) => (
                        <li key={text} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                          <Icon size={13} className="text-primary" />
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Related courses */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold mb-6">Related Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((c, i) => (
                <CourseCard key={c.id} course={c} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
