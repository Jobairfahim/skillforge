'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Clock, Users, BarChart2, Award, Play } from 'lucide-react';
import { cn, formatPrice, formatNumber, getDiscountPercentage } from '@/lib/utils';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'compact' | 'horizontal';
  className?: string;
  index?: number;
}

export function CourseCard({ course, variant = 'default', className, index = 0 }: CourseCardProps) {
  const discount = course.originalPrice ? getDiscountPercentage(course.price, course.originalPrice) : 0;

  if (variant === 'horizontal') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className={cn('group flex gap-4 p-3 rounded-xl hover:bg-accent transition-all cursor-pointer', className)}
      >
        <div className="relative w-28 h-20 rounded-lg overflow-hidden shrink-0">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{course.instructor.name}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-medium">{course.rating}</span>
            <span className="text-xs text-muted-foreground">({formatNumber(course.reviewCount)})</span>
          </div>
          <p className="text-sm font-bold mt-1">{formatPrice(course.price)}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className={cn('group', className)}
    >
      <Link href={`/courses/${course.slug}`}>
        <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:border-primary/20 h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden bg-accent">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <Play size={18} className="text-white ml-0.5" fill="white" />
              </div>
            </div>
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {course.isBestseller && (
                <span className="px-2 py-0.5 bg-yellow-500 text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                  Bestseller
                </span>
              )}
              {course.isNew && (
                <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                  New
                </span>
              )}
            </div>
            {discount > 0 && (
              <div className="absolute top-3 right-3 w-10 h-10 rounded-full gradient-bg flex items-center justify-center shadow-lg">
                <span className="text-[10px] font-bold text-white">-{discount}%</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            {/* Category */}
            <span className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
              {course.category}
            </span>

            {/* Title */}
            <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
              {course.title}
            </h3>

            {/* Instructor */}
            <p className="text-xs text-muted-foreground mb-3">
              {course.instructor.name}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
              <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-foreground">{course.rating}</span>
                <span>({formatNumber(course.reviewCount)})</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart2 size={12} />
                <span>{course.level}</span>
              </div>
            </div>

            {/* Students */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
              <Users size={12} />
              <span>{formatNumber(course.studentCount)} students</span>
              {course.certificate && (
                <>
                  <span className="mx-1">·</span>
                  <Award size={12} />
                  <span>Certificate</span>
                </>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold">{formatPrice(course.price)}</span>
                {course.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(course.originalPrice)}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Skeleton loader
export function CourseCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-card border border-border rounded-2xl overflow-hidden', className)}>
      <div className="aspect-video shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 shimmer rounded-md" />
        <div className="h-4 shimmer rounded-md" />
        <div className="h-4 w-3/4 shimmer rounded-md" />
        <div className="h-3 w-1/3 shimmer rounded-md" />
        <div className="flex gap-3">
          <div className="h-3 w-16 shimmer rounded-md" />
          <div className="h-3 w-12 shimmer rounded-md" />
        </div>
        <div className="pt-3 border-t border-border">
          <div className="h-5 w-20 shimmer rounded-md" />
        </div>
      </div>
    </div>
  );
}
