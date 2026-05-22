'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const schema = z.object({ email: z.string().email('Enter a valid email address') });

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    setSent(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
            <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft size={14} /> Back to sign in
            </Link>
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Mail size={22} className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Forgot password?</h1>
              <p className="text-muted-foreground text-sm">No worries — enter your email and we&apos;ll send you a reset link.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label="Email address" type="email" placeholder="you@example.com"
                leftAddon={<Mail size={15} />} error={errors.email?.message} {...register('email')} />
              <Button type="submit" loading={isLoading} size="lg" className="w-full">
                Send Reset Link
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={28} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Check your inbox</h2>
            <p className="text-muted-foreground text-sm mb-2">We sent a reset link to</p>
            <p className="font-semibold mb-6">{getValues('email')}</p>
            <p className="text-xs text-muted-foreground mb-6">Didn&apos;t receive it? Check spam or{' '}
              <button onClick={() => setSent(false)} className="text-primary hover:underline">try again</button>
            </p>
            <Link href="/auth/login" className="text-sm text-primary font-semibold hover:underline">
              ← Back to sign in
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
