'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CourseCard } from '@/components/shared/CourseCard';
import { mockCourses } from '@/lib/mock-data';

export function FeaturedCourses() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const featured = mockCourses.filter(c => c.isFeatured).slice(0, 4);

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Featured</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Courses Trending Right Now</h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Curated by our experts — the courses making the biggest impact on careers.
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline shrink-0"
          >
            View all courses <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>

        {/* Second row — 2 courses wider */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mockCourses.slice(4, 6).map((course, i) => (
            <CourseCard key={course.id} course={course} index={i + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
