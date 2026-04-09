import { Navbar } from '@/components/advologos/navbar';
import { Hero } from '@/components/advologos/hero';
import { StatsRibbon } from '@/components/advologos/stats-ribbon';
import { TrustStrip } from '@/components/advologos/trust-strip';
import { ProblemSection } from '@/components/advologos/problem-section';
import { ServicesSection } from '@/components/advologos/services-section';
import { MethodSection } from '@/components/advologos/method-section';
import { AboutSection } from '@/components/advologos/about-section';
import { AuthoritySection } from '@/components/advologos/authority-section';
import { FAQSection } from '@/components/advologos/faq-section';
import { ProcessTimeline } from '@/components/advologos/process-timeline';
import { BlogPreview } from '@/components/advologos/blog-preview';
import { ComparisonTable } from '@/components/advologos/comparison-table';
import { BeforeAfterSection } from '@/components/advologos/before-after-section';
import { PortfolioShowcase } from '@/components/advologos/portfolio-showcase';
import { CTASection } from '@/components/advologos/cta-section';
import { SocialProofMarquee } from '@/components/advologos/social-proof-marquee';
import { Footer } from '@/components/advologos/footer';
import { BackToTop } from '@/components/advologos/back-to-top';
import { WhatsAppFloat } from '@/components/advologos/whatsapp-float';
import { ScrollProgress } from '@/components/advologos/scroll-progress';
import { PageLoader } from '@/components/advologos/page-loader';
import { CookieConsent } from '@/components/advologos/cookie-consent';
import { CursorGlow } from '@/components/advologos/cursor-glow';

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <Navbar />
      <CursorGlow />
      <main id="main-content">
        <Hero />
        <StatsRibbon />
        <TrustStrip />
        <ProblemSection />
        <ServicesSection />
        <ComparisonTable />
        <MethodSection />
        <AboutSection />
        <AuthoritySection />
        <FAQSection />
        <ProcessTimeline />
        <BlogPreview />
        <BeforeAfterSection />
        <PortfolioShowcase />
        <CTASection />
      </main>
      <SocialProofMarquee />
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
      <CookieConsent />
    </>
  );
}
