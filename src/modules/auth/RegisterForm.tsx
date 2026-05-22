'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Globe, Code, ArrowRight, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string(),
  role: z.enum(['student', 'instructor']),
  agreeToTerms: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) }),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
type FormData = z.infer<typeof schema>;

const passwordChecks = [
  { label: '8+ characters', test: (p: string) => p.length >= 8 },
  { label: 'Uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Number', test: (p: string) => /[0-9]/.test(p) },
];

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'student' },
  });

  const role = watch('role');

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    console.log('Register:', data);
    setIsLoading(false);
    window.location.href = '/dashboard';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create your account</h1>
        <p className="text-muted-foreground">Start learning for free today</p>
      </div>

      {/* Social auth */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="flex items-center justify-center gap-2.5 h-11 border border-border rounded-xl text-sm font-medium hover:bg-accent transition-all">
          <Globe size={16} /> Google
        </button>
        <button className="flex items-center justify-center gap-2.5 h-11 border border-border rounded-xl text-sm font-medium hover:bg-accent transition-all">
          <Code size={16} /> GitHub
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center text-xs text-muted-foreground">
          <span className="px-3 bg-background">or sign up with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Role selector */}
        <div>
          <label className="block text-sm font-medium mb-2">I want to</label>
          <div className="grid grid-cols-2 gap-3">
            {(['student', 'instructor'] as const).map(r => (
              <label key={r} className={cn(
                'flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all',
                role === r ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-accent'
              )}>
                <input type="radio" value={r} {...register('role')} className="hidden" />
                <span className="text-xl">{r === 'student' ? '📚' : '🎓'}</span>
                <div>
                  <p className="text-sm font-semibold capitalize">{r === 'student' ? 'Learn skills' : 'Teach & earn'}</p>
                  <p className="text-xs text-muted-foreground">{r === 'student' ? 'As a student' : 'As an instructor'}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <Input
          label="Full name"
          placeholder="Alex Johnson"
          leftAddon={<User size={15} />}
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          leftAddon={<Mail size={15} />}
          error={errors.email?.message}
          {...register('email')}
        />

        <div>
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            leftAddon={<Lock size={15} />}
            rightAddon={
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
            error={errors.password?.message}
            {...register('password', { onChange: e => setPasswordValue(e.target.value) })}
          />
          {passwordValue && (
            <div className="flex gap-3 mt-2">
              {passwordChecks.map(c => (
                <div key={c.label} className={cn(
                  'flex items-center gap-1 text-[10px] font-medium transition-colors',
                  c.test(passwordValue) ? 'text-emerald-500' : 'text-muted-foreground'
                )}>
                  <CheckCircle size={10} />
                  {c.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <Input
          label="Confirm password"
          type="password"
          placeholder="Repeat your password"
          leftAddon={<Lock size={15} />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <div>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input type="checkbox" className="mt-0.5 rounded border-border" {...register('agreeToTerms')} />
            <span className="text-xs text-muted-foreground">
              I agree to the{' '}
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-xs text-destructive mt-1">{errors.agreeToTerms.message}</p>
          )}
        </div>

        <Button type="submit" loading={isLoading} size="lg" className="w-full" rightIcon={<ArrowRight size={16} />}>
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-primary font-semibold hover:underline">Sign in</Link>
      </p>
    </motion.div>
  );
}
