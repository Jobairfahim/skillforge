import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-950 flex-col justify-between p-12">
        {/* Gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 right-0 bottom-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Skill<span className="gradient-text">Forge</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10">
          <blockquote className="text-xl font-medium text-white/90 leading-relaxed mb-6">
            &ldquo;SkillForge completely transformed my career. I went from junior dev to senior engineer at Stripe in 8 months.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer"
              alt="Jennifer Lee"
              className="w-11 h-11 rounded-xl border border-white/20 bg-white/10"
            />
            <div>
              <p className="font-semibold text-white text-sm">Jennifer Lee</p>
              <p className="text-white/60 text-xs">Frontend Developer @ Stripe</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { value: '100k+', label: 'Learners' },
            { value: '4.9', label: 'Avg Rating' },
            { value: '1,200+', label: 'Courses' },
          ].map(s => (
            <div key={s.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-white/60 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold">Skill<span className="gradient-text">Forge</span></span>
          </Link>

          {children}
        </div>
      </div>
    </div>
  );
}
