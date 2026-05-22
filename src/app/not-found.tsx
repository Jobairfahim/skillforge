'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-lg"
      >
        {/* 404 graphic */}
        <div className="mb-8">
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[120px] md:text-[160px] font-black leading-none tracking-tight select-none"
          >
            <span className="gradient-text">404</span>
          </motion.div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Looks like you&apos;ve ventured into uncharted territory. The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-xl shadow-primary/20 w-full sm:w-auto justify-center"
          >
            <Home size={16} /> Go Home
          </Link>
          <Link
            href="/courses"
            className="flex items-center gap-2 px-6 py-3 bg-card border border-border font-semibold rounded-xl hover:bg-accent transition-colors w-full sm:w-auto justify-center text-sm"
          >
            <Search size={16} /> Browse Courses
          </Link>
        </div>

        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-6 mx-auto transition-colors"
        >
          <ArrowLeft size={14} /> Go back
        </button>
      </motion.div>
    </div>
  );
}
