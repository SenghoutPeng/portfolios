import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeaturedProjectsSection } from "@/components/featured-projects-section";
import { PhilosophySection } from "@/components/philosophy-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navigation />

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <HeroSection />

        <div className="mt-32 space-y-32 pb-32">
          <FeaturedProjectsSection />
          <PhilosophySection />
          <ExpertiseSection />
          <ExperienceSection />
          <ContactSection />
        </div>
      </div>

      <Footer />
    </main>
  );
}
