import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, BookOpen } from "lucide-react";
import { useLocation, Link } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4" style={{ background: "transparent" }}>
      {/* Semi-transparent overlay so the video is still visible */}
      <div
        className="fixed inset-0"
        style={{
          zIndex: 0,
          background: "linear-gradient(to bottom, rgba(10,22,40,0.6) 0%, rgba(10,22,40,0.75) 100%)",
          pointerEvents: "none",
        }}
      />

      <Card className="relative w-full max-w-lg shadow-2xl border border-white/10 bg-card/90 backdrop-blur-md" style={{ zIndex: 1 }}>
        <CardContent className="pt-8 pb-8 text-center">
          {/* Brand */}
          <Link href="/">
            <div className="flex items-center justify-center gap-2 mb-8 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <BookOpen className="w-3.5 h-3.5 text-secondary-foreground" />
              </div>
              <span className="font-serif text-base font-semibold text-foreground group-hover:text-secondary transition-colors">
                Next Chapter Travel
              </span>
            </div>
          </Link>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/10 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-destructive" />
            </div>
          </div>

          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">404</h1>

          <h2 className="text-xl font-serif font-semibold text-foreground mb-4">
            Page Not Found
          </h2>

          <p className="text-muted-foreground font-sans mb-8 leading-relaxed text-sm">
            Sorry, the page you are looking for doesn't exist.
            <br />
            It may have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setLocation("/")}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-sans px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
