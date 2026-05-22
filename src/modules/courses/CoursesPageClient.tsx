'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { CourseCard, CourseCardSkeleton } from '@/components/shared/CourseCard';
import { mockCourses, mockCategories } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export function CoursesPageClient() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All Levels');
  const [sort, setSort] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    let result = [...mockCourses];
    if (search) result = result.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.name.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== 'All') result = result.filter(c => c.category === category);
    if (level !== 'All Levels') result = result.filter(c => c.level === level);

    switch (sort) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      default: result.sort((a, b) => b.studentCount - a.studentCount);
    }
    return result;
  }, [search, category, level, sort]);

  const paginated = filtered.slice(0, page * perPage);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="pt-20 min-h-screen">
      {/* Page header */}
      <div className="bg-card/50 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-2">All Courses</h1>
            <p className="text-muted-foreground">
              {filtered.length} courses available {search && `for "${search}"`}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search courses..."
              className="w-full h-10 pl-9 pr-4 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-2 px-4 h-10 text-sm font-medium border rounded-xl transition-all',
                showFilters ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-background border-border hover:bg-accent'
              )}
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>

            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="h-10 px-3 pr-8 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer appearance-none"
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {['All', ...mockCategories.map(c => c.name)].map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                category === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-accent text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Extended filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-card border border-border rounded-2xl"
          >
            <div className="flex flex-wrap gap-6">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Level</label>
                <div className="flex gap-2 flex-wrap">
                  {levels.map(l => (
                    <button
                      key={l}
                      onClick={() => { setLevel(l); setPage(1); }}
                      className={cn(
                        'px-3 py-1.5 text-xs font-medium rounded-lg border transition-all',
                        level === l ? 'bg-primary/10 border-primary/30 text-primary' : 'border-border hover:bg-accent'
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
            <button onClick={() => { setSearch(''); setCategory('All'); setLevel('All Levels'); }} className="px-6 py-2.5 gradient-bg text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="px-8 py-3 border border-border bg-card hover:bg-accent text-sm font-semibold rounded-xl transition-all"
                >
                  Load More Courses ({filtered.length - paginated.length} remaining)
                </button>
              </div>
            )}

            {!hasMore && filtered.length > perPage && (
              <p className="text-center text-sm text-muted-foreground mt-8">
                Showing all {filtered.length} courses
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
