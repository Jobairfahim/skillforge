import { LoginForm } from '@/modules/auth/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Sign In' };

export default function LoginPage() {
  return <LoginForm />;
}
