import { createContext, useContext, useState, ReactNode } from "react";

// ─── Video catalog — CDN-hosted MP4s (CloudFront, iOS Safari compatible) ──────
// All videos are self-hosted on our CDN to ensure iOS Safari autoplay works.
// Videos are muted, looping, and under 5MB each for fast mobile loading.
// Source: Mixkit free stock video (mixkit.co) — commercial use permitted.
export type VideoEntry = {
  src: string;
  poster: string;
  label: string;
};

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400814556/YzQ4CdxemtnRpcg9zzL4Fa";

export const VIDEO_CATALOG: Record<string, VideoEntry> = {
  // Landing page — aerial coastal view, beautiful turquoise water
  landing: {
    src: `${CDN}/landing_805b577b.mp4`,
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1280&q=60",
    label: "Explore the World",
  },
  // Dashboard — waves rolling onto a sandy beach
  dashboard: {
    src: `${CDN}/dashboard_8a55c9d9.mp4`,
    poster: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1280&q=60",
    label: "Your Journey Awaits",
  },
  // Itinerary — driving down a curved mountain highway
  itinerary: {
    src: `${CDN}/itinerary_7348dd96.mp4`,
    poster: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1280&q=60",
    label: "Day by Day",
  },
  // Documents — flight crew preparing aircraft for departure
  documents: {
    src: `${CDN}/documents_1a88f454.mp4`,
    poster: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1280&q=60",
    label: "Travel Documents",
  },
  // Messages — Venice canal at night, romantic connection
  messages: {
    src: `${CDN}/messages_5d50481a.mp4`,
    poster: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1280&q=60",
    label: "Stay Connected",
  },
  // Packing — driving on an empty tree-lined road (journey prep)
  packing: {
    src: `${CDN}/packing_aee5f9f2.mp4`,
    poster: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1280&q=60",
    label: "Pack Your Bags",
  },
  // Bookings — panoramic airplane window view at dusk
  bookings: {
    src: `${CDN}/bookings_2a93f868.mp4`,
    poster: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1280&q=60",
    label: "Your Bookings",
  },
  // Destination guides — tropical beach from above, palm trees
  guides: {
    src: `${CDN}/guides_103d6835.mp4`,
    poster: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1280&q=60",
    label: "Discover Your Destination",
  },
  // Alerts — dramatic sunset over a bay from above
  alerts: {
    src: `${CDN}/alerts_bcd3edf2.mp4`,
    poster: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1280&q=60",
    label: "Travel Alerts",
  },
};

// ─── Context ────────────────────────────────────────────────────────────────
type VideoHeroContextValue = {
  currentVideo: VideoEntry;
  currentKey: string;
  setVideoContext: (key: string) => void;
  preloadVideo: (key: string) => void;
};

const VideoHeroContext = createContext<VideoHeroContextValue>({
  currentVideo: VIDEO_CATALOG.landing,
  currentKey: 'landing',
  setVideoContext: () => {},
  preloadVideo: () => {},
});

export function VideoHeroProvider({ children }: { children: ReactNode }) {
  const [currentKey, setCurrentKey] = useState<string>('landing');
  const currentVideo = VIDEO_CATALOG[currentKey] ?? VIDEO_CATALOG.landing;

  const setVideoContext = (key: string) => {
    if (VIDEO_CATALOG[key]) {
      setCurrentKey(key);
    }
  };

  const preloadVideo = (key: string) => {
    const entry = VIDEO_CATALOG[key];
    if (!entry) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = entry.src;
    document.head.appendChild(link);
  };

  return (
    <VideoHeroContext.Provider value={{ currentVideo, currentKey, setVideoContext, preloadVideo }}>
      {children}
    </VideoHeroContext.Provider>
  );
}

export function useVideoHero() {
  return useContext(VideoHeroContext);
}
