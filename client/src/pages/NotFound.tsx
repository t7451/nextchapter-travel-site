import { Button } from "@/components/ui/button";
import { Compass, Home, MapPin, Plane } from "lucide-react";
import { useLocation, Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { useEffect } from "react";
import { useVideoHero } from "@/contexts/VideoHeroContext";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const { setVideoContext } = useVideoHero();

  useEffect(() => {
    setVideoContext("not-found");
  }, [setVideoContext]);

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div
      className="relative min-h-dvh w-full flex items-center justify-center px-4 py-12 bg-transparent overflow-hidden"
      style={{
        paddingBottom: "max(3rem, calc(2rem + env(safe-area-inset-bottom, 0px)))",
      }}
    >
      <SEOHead title="Page Not Found" canonical="/404" noIndex />

      {/* Aurora backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="aurora-blob gold" style={{ width: "40rem", height: "40rem", top: "-12rem", left: "-12rem" }} />
        <span className="aurora-blob navy" style={{ width: "36rem", height: "36rem", bottom: "-10rem", right: "-10rem", opacity: 0.5 }} />
        <span className="aurora-blob cream" style={{ width: "26rem", height: "26rem", top: "30%", right: "20%", opacity: 0.35 }} />
      </div>

      {/* Twinkling stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="twinkle-1 absolute top-[12%] left-[18%] w-1.5 h-1.5 rounded-full bg-secondary/80 shadow-[0_0_8px_oklch(0.82_0.1_80/0.7)]" />
        <span className="twinkle-2 absolute top-[22%] right-[15%] w-1 h-1 rounded-full bg-secondary/70 shadow-[0_0_6px_oklch(0.82_0.1_80/0.6)]" />
        <span className="twinkle-3 absolute bottom-[25%] left-[28%] w-1.5 h-1.5 rounded-full bg-secondary/80 shadow-[0_0_8px_oklch(0.82_0.1_80/0.7)]" />
        <span className="twinkle-1 absolute bottom-[18%] right-[22%] w-1 h-1 rounded-full bg-secondary/70 shadow-[0_0_6px_oklch(0.82_0.1_80/0.6)]" />
        <span className="twinkle-2 absolute top-[40%] left-[8%] w-1 h-1 rounded-full bg-secondary/60" />
        <span className="twinkle-3 absolute top-[55%] right-[8%] w-1.5 h-1.5 rounded-full bg-secondary/70 shadow-[0_0_8px_oklch(0.82_0.1_80/0.6)]" />
      </div>

      <div className="max-w-lg w-full text-center relative">
        {/* Compass icon with rotating needle and pulsing ring */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
            <div className="ring-glow soft-ring-pulse relative w-28 h-28 rounded-full bg-primary/80 backdrop-blur-md border border-secondary/40 flex items-center justify-center">
              {/* Slowly rotating outer compass markings */}
              <Compass
                aria-hidden="true"
                className="compass-spin absolute inset-0 m-auto w-20 h-20 text-secondary/40"
              />
              {/* Static inner compass icon for emphasis */}
              <Compass className="relative w-12 h-12 text-secondary" />
            </div>
            {/* Floating mini plane orbiting the compass */}
            <div aria-hidden="true" className="absolute -top-2 -right-3 float-icon-2">
              <Plane className="w-5 h-5 text-secondary/70 -rotate-45" />
            </div>
            <div aria-hidden="true" className="absolute -bottom-1 -left-3 float-icon-3">
              <MapPin className="w-4 h-4 text-secondary/60" />
            </div>
          </div>
        </div>

        {/* Text */}
        <p className="text-secondary font-sans text-sm tracking-[0.28em] uppercase mb-2 font-semibold inline-flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary dot-pulse" />
          404 — Lost at Sea
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3 heading-glow">
          Page <span className="text-gradient-gold italic">Not Found</span>
        </h1>
        <p className="text-muted-foreground font-sans leading-relaxed mb-8 max-w-md mx-auto">
          It looks like this page has sailed away. Let&rsquo;s get you back on
          course — your next adventure is just a click away.
        </p>

        {/* Decorative section divider */}
        <div aria-hidden="true" className="section-divider mb-8">
          <span className="section-divider-icon" />
        </div>

        {/* CTA */}
        <div
          id="not-found-button-group"
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button
            onClick={handleGoHome}
            className="btn-shimmer w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 min-h-[52px] rounded-xl font-sans font-bold active:scale-[0.99] transition-transform cta-glow"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Link href="/destinations">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-secondary/30 hover:bg-secondary/10 px-8 py-3 min-h-[52px] rounded-xl font-sans font-bold active:scale-[0.99] transition-transform"
            >
              <Compass className="w-4 h-4 mr-2" />
              Explore Destinations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
