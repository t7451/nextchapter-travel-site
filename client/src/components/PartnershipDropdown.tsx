import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export function PartnershipDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200",
          "text-white/80 hover:text-white hover:bg-white/10",
          "font-sans text-sm font-medium",
          "min-h-[44px] min-w-[44px]",
          isOpen && "bg-white/15 text-white"
        )}
      >
        <span>Our Partners</span>
        <ChevronDown className={cn(
          "w-3.5 h-3.5 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="px-4 pt-4 pb-2">
            <p className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-wider">
              Luxury Travel Partners
            </p>
          </div>

          {/* Wendy's site card */}
          <a
            href="https://www.thenextchaptertravel.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 mx-3 mb-2 rounded-lg bg-gradient-to-br from-blue-50/80 to-blue-50/40 hover:from-blue-100 hover:to-blue-50 border border-blue-200/50 hover:border-blue-300 transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 transition-colors">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif font-semibold text-gray-900 text-sm leading-tight">
                  The Next Chapter Travel
                </p>
                <p className="text-xs text-gray-600 mt-0.5 leading-snug">
                  Wendy's luxury all-women group trips & travel expertise
                </p>
              </div>
              <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                →
              </div>
            </div>
          </a>

          {/* Jessica's portal card */}
          <a
            href="/portal"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 mx-3 mb-3 rounded-lg bg-gradient-to-br from-amber-50/80 to-amber-50/40 hover:from-amber-100 hover:to-amber-50 border border-amber-200/50 hover:border-amber-300 transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600/20 transition-colors">
                <Compass className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif font-semibold text-gray-900 text-sm leading-tight">
                  Jessica's Client Portal
                </p>
                <p className="text-xs text-gray-600 mt-0.5 leading-snug">
                  Your personalized trip planning & management hub
                </p>
              </div>
              <div className="text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                →
              </div>
            </div>
          </a>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Footer note */}
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-gray-500 font-sans">
              <span className="font-semibold">Wendy</span> (CEO) &amp; <span className="font-semibold">Jessica</span> (CFO)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
