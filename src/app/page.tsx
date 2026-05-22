import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/modules/landing/HeroSection';
import { StatsSection } from '@/modules/landing/StatsSection';
import { FeaturedCourses } from '@/modules/landing/FeaturedCourses';
import { CategoriesSection } from '@/modules/landing/CategoriesSection';
import { TestimonialsSection } from '@/modules/landing/TestimonialsSection';
import { CTASection } from '@/modules/landing/CTASection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturedCourses />
      <CategoriesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
