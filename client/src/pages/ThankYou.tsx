import { useEffect } from "react";
import { useVideoHero } from "@/contexts/VideoHeroContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  CheckCircle,
  Clock,
  Mail,
  Calendar,
  ArrowRight,
  Sparkles,
  Send,
  MessageSquare,
  FileText,
  BookOpen,
  Plane,
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const NEXT_STEPS = [
  {
    step: 1,
    icon: Send,
    title: "Jessica Reviews Your Request",
    desc: "Within 24 hours, Jessica will review your trip details and preferences.",
  },
  {
    step: 2,
    icon: MessageSquare,
    title: "Initial Consultation",
    desc: "Jessica will reach out via email or phone to discuss your vision, budget, and travel style.",
  },
  {
    step: 3,
    icon: FileText,
    title: "Personalized Itinerary",
    desc: "You'll receive a custom-crafted itinerary with flights, accommodations, activities, and insider tips.",
  },
  {
    step: 4,
    icon: BookOpen,
    title: "Portal Access",
    desc: "You'll receive an invite to Jessica's client portal to track your trip, access documents, and stay connected.",
  },
  {
    step: 5,
    icon: Plane,
    title: "Enjoy Your Journey",
    desc: "Depart with confidence. Jessica is available 24/7 for any questions or changes during your trip.",
  },
];

export function ThankYou() {
  const { setVideoContext } = useVideoHero();

  useEffect(() => {
    setVideoContext("thank-you");
  }, [setVideoContext]);

  return (
    <div
      className="relative min-h-dvh flex items-center justify-center px-4 py-10 sm:py-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, rgba(10,22,40,0.78) 0%, rgba(10,22,40,0.88) 100%)",
        paddingBottom: "max(2.5rem, calc(2rem + env(safe-area-inset-bottom, 0px)))",
        paddingTop: "max(2.5rem, calc(2rem + env(safe-area-inset-top, 0px)))",
      }}
    >
      <SEOHead
        title="Thank You — Your Trip Inquiry Was Received"
        description="Thank you for reaching out! Jessica at Next Chapter Travel will review your trip request and respond within 24 hours."
        canonical="/thank-you"
        noIndex
      />

      {/* Aurora backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="aurora-blob gold" style={{ width: "40rem", height: "40rem", top: "-12rem", left: "-10rem", opacity: 0.45 }} />
        <span className="aurora-blob navy" style={{ width: "36rem", height: "36rem", bottom: "-10rem", right: "-10rem", opacity: 0.45 }} />
      </div>
      {/* Subtle dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid-bg opacity-20" />

      <div className="max-w-2xl w-full relative">
        {/* Success icon — gradient ring + soft pulse */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 bg-secondary/25 rounded-full blur-2xl animate-pulse" />
            <div className="ring-glow soft-ring-pulse relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-secondary via-secondary/95 to-secondary/75 text-secondary-foreground flex items-center justify-center shadow-2xl">
              <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 animate-success-checkmark" />
            </div>
          </div>
        </div>

        {/* Main message */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-secondary font-sans text-xs sm:text-sm tracking-[0.28em] uppercase mb-3 font-semibold inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Inquiry Received
          </p>
          <h1 className="text-[2rem] leading-[1.1] sm:text-5xl font-serif font-bold text-white mb-3 sm:mb-4 tracking-tight heading-glow">
            Thank <span className="text-gradient-gold italic">You!</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-2 font-sans">
            Your trip inquiry has been received.
          </p>
          <p className="text-base sm:text-lg text-secondary font-sans">
            Jessica is excited to help plan your perfect journey.
          </p>
          <div aria-hidden="true" className="section-divider mt-6">
            <span className="section-divider-icon" />
          </div>
        </div>

        {/* Next steps timeline */}
        <div className="gradient-border-gold card-accent-gold relative bg-white/8 backdrop-blur-md rounded-2xl p-5 sm:p-8 mb-8 sm:mb-12 shadow-xl shadow-black/20">
          <h2 className="text-lg sm:text-xl font-serif font-semibold text-white mb-6 sm:mb-8 flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary flex-shrink-0" />
            What Happens Next
          </h2>

          <div className="relative space-y-5 sm:space-y-6">
            {/* Vertical connector line behind step circles */}
            <div
              aria-hidden="true"
              className="absolute left-[1.125rem] sm:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-secondary/50 via-secondary/25 to-transparent"
            />

            {NEXT_STEPS.map(item => (
              <div key={item.step} className="relative flex gap-4 group">
                <div className="flex-shrink-0 relative z-10">
                  <div className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-secondary via-secondary/90 to-secondary/70 text-secondary-foreground font-semibold text-sm shadow-[0_0_20px_-4px_oklch(0.72_0.09_65/0.6)] group-hover:scale-110 transition-transform">
                    <item.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  </div>
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="text-white font-semibold mb-1 font-sans flex items-center gap-2">
                    <span className="text-secondary/70 font-sans text-xs tracking-wider">
                      {String(item.step).padStart(2, "0")}
                    </span>
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact info cards */}
        <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {/* Email card */}
          <div className="gradient-border-gold card-accent-gold bg-white/8 backdrop-blur-md rounded-xl p-5 sm:p-6 lift-on-hover tilt-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/15 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-secondary" />
              </div>
              <h3 className="font-semibold text-white font-sans">Email Jessica</h3>
            </div>
            <p className="text-white/70 text-sm mb-3 font-sans">
              Response within 24 hours
            </p>
            <a
              href="mailto:seidersconsulting@gmail.com"
              className="text-secondary hover:text-secondary/80 transition-colors text-sm font-medium font-sans break-all"
            >
              seidersconsulting@gmail.com
            </a>
          </div>

          {/* Calendar card */}
          <div className="gradient-border-gold card-accent-gold bg-white/8 backdrop-blur-md rounded-xl p-5 sm:p-6 lift-on-hover tilt-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/15 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-secondary" />
              </div>
              <h3 className="font-semibold text-white font-sans">Schedule a Call</h3>
            </div>
            <p className="text-white/70 text-sm mb-3 font-sans">
              Book a consultation directly
            </p>
            <a
              href="https://calendly.com/jessica-nextchapter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary/80 transition-colors text-sm font-medium font-sans inline-flex items-center gap-1"
            >
              View Availability
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 min-h-[52px] active:scale-[0.99] transition-transform"
            >
              Back to Home
            </Button>
          </Link>
          <Link href="/about" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="btn-shimmer w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 min-h-[52px] active:scale-[0.99] transition-transform cta-glow"
            >
              Learn More About Jessica
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Trust note */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm font-sans">
            Your information is secure and will only be used to plan your trip.
          </p>
        </div>
      </div>
    </div>
  );
}
