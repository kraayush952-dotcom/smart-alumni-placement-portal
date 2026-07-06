import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FeaturedOpportunities from "@/components/landing/FeaturedOpportunities";
import FeaturedAlumni from "@/components/landing/FeaturedAlumni";
import CTASection from "@/components/landing/CTASection";
import StatsSection from "@/components/landing/StatsSection";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <FeaturedOpportunities />
        <FeaturedAlumni />
        <CTASection />
        <StatsSection />
      </main>

      <Footer />
    </>
  );
}