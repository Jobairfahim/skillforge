import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { StoreProvider } from '@/store';
import { ToastContainer } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: { default: 'SkillForge — Learn. Build. Grow.', template: '%s | SkillForge' },
  description: 'Master in-demand skills with expert-led courses. Join 100,000+ learners transforming their careers.',
  keywords: ['online learning', 'courses', 'programming', 'design', 'AI', 'machine learning'],
  openGraph: {
    title: 'SkillForge — Learn. Build. Grow.',
    description: 'Master in-demand skills with expert-led courses.',
    url: 'https://skillforge.io',
    siteName: 'SkillForge',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillForge — Learn. Build. Grow.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <StoreProvider>
            {children}
            <ToastContainer />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
