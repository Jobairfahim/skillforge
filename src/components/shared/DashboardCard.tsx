'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  color?: 'indigo' | 'purple' | 'cyan' | 'emerald' | 'orange' | 'rose';
  description?: string;
  index?: number;
}

const colorMap = {
  indigo: 'from-indigo-500 to-indigo-600 shadow-indigo-500/20',
  purple: 'from-purple-500 to-purple-600 shadow-purple-500/20',
  cyan: 'from-cyan-500 to-cyan-600 shadow-cyan-500/20',
  emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/20',
  orange: 'from-orange-500 to-orange-600 shadow-orange-500/20',
  rose: 'from-rose-500 to-rose-600 shadow-rose-500/20',
};

const bgMap = {
  indigo: 'bg-indigo-500/10',
  purple: 'bg-purple-500/10',
  cyan: 'bg-cyan-500/10',
  emerald: 'bg-emerald-500/10',
  orange: 'bg-orange-500/10',
  rose: 'bg-rose-500/10',
};

export function DashboardCard({
  title, value, change, changeLabel, icon: Icon, color = 'indigo', description, index = 0
}: DashboardCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', bgMap[color])}>
          <Icon size={18} className={cn(
            color === 'indigo' ? 'text-indigo-500' :
            color === 'purple' ? 'text-purple-500' :
            color === 'cyan' ? 'text-cyan-500' :
            color === 'emerald' ? 'text-emerald-500' :
            color === 'orange' ? 'text-orange-500' : 'text-rose-500'
          )} />
        </div>
        {change !== undefined && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg',
            isPositive ? 'text-emerald-600 bg-emerald-500/10' : 'text-red-500 bg-red-500/10'
          )}>
            {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold tracking-tight mb-1">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
        {changeLabel && (
          <p className="text-xs text-muted-foreground mt-1">{changeLabel}</p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </motion.div>
  );
}

// Skeleton
export function DashboardCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl shimmer" />
        <div className="h-6 w-12 shimmer rounded-lg" />
      </div>
      <div className="h-7 w-24 shimmer rounded-md mb-2" />
      <div className="h-4 w-32 shimmer rounded-md" />
    </div>
  );
}
