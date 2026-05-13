import { Header } from "@/components/header"
import { AnnouncementBanner } from "@/components/announcement-banner"
import { HeroSection } from "@/components/hero-section"
import { TrustIndicators } from "@/components/trust-indicators"
import { PortfolioSection } from "@/components/portfolio-section"
import { ServicesSection } from "@/components/services-section"
import { WhyUsSection } from "@/components/why-us-section"
import { ReviewsSection } from "@/components/reviews-section"
import { ContactSection } from "@/components/contact-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <AnnouncementBanner blogUrl="https://blog.naver.com/laforetdesign" />
      <HeroSection />
      <TrustIndicators />
      <PortfolioSection />
      <ServicesSection />
      <WhyUsSection />
      <ReviewsSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </main>
  )
}
