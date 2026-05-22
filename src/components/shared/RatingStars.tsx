import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export function RatingStars({ rating, max = 5, size = 14, showValue = false, className }: RatingStarsProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' :
            i < rating ? 'text-yellow-400 fill-yellow-400/50' :
            'text-muted-foreground/30 fill-muted-foreground/10'
          )}
        />
      ))}
      {showValue && (
        <span className="text-sm font-semibold ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}

interface RatingBarProps {
  label: string;
  percentage: number;
  count: number;
}

export function RatingBar({ label, percentage, count }: RatingBarProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted-foreground w-3">{label}</span>
      <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-muted-foreground w-8 text-right">{count}</span>
    </div>
  );
}
