import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CourseDetailClient } from '@/modules/courses/CourseDetailClient';
import { mockCourses } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = mockCourses.find(c => c.slug === slug);
  if (!course) return {};
  return { title: course.title, description: course.shortDescription };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = mockCourses.find(c => c.slug === slug);
  if (!course) notFound();

  return (
    <main className="min-h-screen">
      <Navbar />
      <CourseDetailClient course={course} />
      <Footer />
    </main>
  );
}
