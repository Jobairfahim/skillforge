import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CoursesPageClient } from '@/modules/courses/CoursesPageClient';

export const metadata = {
  title: 'Browse Courses',
  description: 'Explore 1,200+ expert-led courses in web dev, data science, design, and more.',
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CoursesPageClient />
      <Footer />
    </main>
  );
}
