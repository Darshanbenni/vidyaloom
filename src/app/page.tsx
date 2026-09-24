import { Header } from "@/components/sections/Header";
import { TechRail } from "@/components/sections/TechRail";
import { HeroSection } from "@/components/sections/HeroSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { TrainingSection } from "@/components/sections/TrainingSection";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#50627E] antialiased">
      {/* 1. Header */}
      <Header />

      {/* Main Content Landmarks */}
      <main id="main-content" className="flex-grow">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Technology Logo Rail */}
        <TechRail />

        {/* 4. Solutions Section */}
        <SolutionsSection />

        {/* 5. Future-Ready Learning & Training Section */}
        <TrainingSection />

        {/* 6. Dashboard & About Section */}
        <DashboardSection />

        {/* 7. Testimonials Section */}
        <TestimonialsSection />

        {/* 8. Closing Campus CTA Banner */}
        <ClosingCtaSection />
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
