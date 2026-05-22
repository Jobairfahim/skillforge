import { CourseLearningClient } from '@/modules/dashboard/CourseLearningClient';
import { mockCourses } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

interface Props { params: Promise<{ courseId: string }> }

export default async function LearningPage({ params }: Props) {
  const { courseId } = await params;
  const course = mockCourses.find(c => c.id === courseId);
  if (!course) notFound();
  return <CourseLearningClient course={course} />;
}
