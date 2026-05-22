'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

const perks = [
  'Access to 1,200+ courses',
  'Learn at your own pace',
  'Expert instructors',
  'Certificates of completion',
  'Mobile app access',
  '30-day money back guarantee',
];

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-card border border-border rounded-3xl p-10 md:p-16 overflow-hidden text-center"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 mb-6">
              Limited Offer — 50% Off Today
            </span>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Ready to <span className="gradient-text">level up?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Join 100,000+ professionals building the skills they need for tomorrow&apos;s opportunities.
            </p>

            {/* Perks grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10 text-left max-w-xl mx-auto">
              {perks.map(perk => (
                <div key={perk} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={14} className="text-primary shrink-0" />
                  <span className="text-muted-foreground">{perk}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="flex items-center gap-2 px-8 py-4 gradient-bg text-white font-semibold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 text-base w-full sm:w-auto justify-center"
              >
                Start Learning for Free
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/courses"
                className="flex items-center gap-2 px-8 py-4 bg-accent border border-border text-foreground font-semibold rounded-2xl hover:bg-muted transition-all text-base w-full sm:w-auto justify-center"
              >
                Browse Courses
              </Link>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              No credit card required. Free trial for 7 days.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
