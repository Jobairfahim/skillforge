'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Star, CheckCircle, Sparkles } from 'lucide-react';

const floatingBadges = [
  { icon: '🚀', text: 'React Mastery', user: 'Alex K.', sub: 'Just enrolled', pos: 'top-[20%] left-[5%]', delay: 0 },
  { icon: '🏆', text: 'Certificate Earned!', user: 'Maria L.', sub: 'Just completed', pos: 'top-[60%] right-[3%]', delay: 0.5 },
  { icon: '⭐', text: '4.9 avg rating', user: '100k+ learners', sub: '', pos: 'bottom-[20%] left-[3%]', delay: 1 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-3xl opacity-30" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating badges */}
      {floatingBadges.map((badge, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 + badge.delay }}
          className={`absolute ${badge.pos} hidden lg:block z-10`}
        >
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: badge.delay }}
            className="glass bg-card/80 border border-border backdrop-blur-xl rounded-2xl p-3 shadow-2xl"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{badge.icon}</span>
              <div>
                <p className="text-xs font-semibold whitespace-nowrap">{badge.text}</p>
                <p className="text-[10px] text-muted-foreground">{badge.user}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <Sparkles size={14} className="text-primary" />
            <span>New: AI-Powered Learning Paths</span>
            <ArrowRight size={12} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            The platform where{' '}
            <span className="gradient-text">ambition meets</span>
            {' '}expertise
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Learn from world-class instructors, build real projects, and unlock your potential.
            Join 100,000+ learners transforming their careers.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/courses"
              className="flex items-center gap-2 px-8 py-4 gradient-bg text-white font-semibold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 text-base"
            >
              Start Learning Free
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/courses"
              className="flex items-center gap-2 px-8 py-4 bg-card border border-border text-foreground font-semibold rounded-2xl hover:bg-accent transition-all text-base"
            >
              <Play size={16} fill="currentColor" />
              Watch Demo
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            {[
              { icon: CheckCircle, text: 'Free trial, no credit card' },
              { icon: CheckCircle, text: '1,200+ expert-led courses' },
              { icon: CheckCircle, text: 'Certificate of completion' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={15} className="text-primary" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map(i => (
                <img
                  key={i}
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-background bg-accent"
                />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm"><strong>4.9/5</strong> from 50,000+ reviews</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground"
      >
        <span className="text-xs">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-current rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
