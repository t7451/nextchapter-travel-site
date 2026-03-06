import { createContext, useContext, useState, useCallback, ReactNode } from "react";

// ─── Video catalog — Pexels free CDN direct MP4 links ─────────────────────────
// Each entry has a primary HD URL + a poster (first frame) fallback image
export type VideoEntry = {
  src: string;
  poster: string;
  label: string;
};

export const VIDEO_CATALOG: Record<string, VideoEntry> = {
  // Landing page — hot air balloons over Cappadocia
  landing: {
    src: "https://videos.pexels.com/video-files/1448735/1448735-uhd_2560_1440_24fps.mp4",
    poster: "https://images.pexels.com/videos/1448735/pictures/preview-0.jpg",
    label: "Explore the World",
  },
  // Dashboard — aerial ocean coastline
  dashboard: {
    src: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/videos/3571264/pictures/preview-0.jpg",
    label: "Your Journey Awaits",
  },
  // Itinerary — winding mountain road journey
  itinerary: {
    src: "https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/videos/2169880/pictures/preview-0.jpg",
    label: "Day by Day",
  },
  // Documents — airport terminal
  documents: {
    src: "https://videos.pexels.com/video-files/3629578/3629578-uhd_2560_1440_25fps.mp4",
    poster: "https://images.pexels.com/videos/3629578/pictures/preview-0.jpg",
    label: "Travel Documents",
  },
  // Messages — cozy cafe / connection
  messages: {
    src: "https://videos.pexels.com/video-files/4812205/4812205-uhd_2560_1440_25fps.mp4",
    poster: "https://images.pexels.com/videos/4812205/pictures/preview-0.jpg",
    label: "Stay Connected",
  },
  // Packing — suitcase / travel prep
  packing: {
    src: "https://videos.pexels.com/video-files/4057072/4057072-uhd_2560_1440_25fps.mp4",
    poster: "https://images.pexels.com/videos/4057072/pictures/preview-0.jpg",
    label: "Pack Your Bags",
  },
  // Bookings — airplane wing / flight
  bookings: {
    src: "https://videos.pexels.com/video-files/2053100/2053100-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/videos/2053100/pictures/preview-0.jpg",
    label: "Your Bookings",
  },
  // Destination guides — tropical beach paradise
  guides: {
    src: "https://videos.pexels.com/video-files/1739010/1739010-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/videos/1739010/pictures/preview-0.jpg",
    label: "Discover Your Destination",
  },
  // Alerts — dramatic sky / storm clouds
  alerts: {
    src: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/videos/3571264/pictures/preview-0.jpg",
    label: "Travel Alerts",
  },
  // Disney / theme park context
  disney: {
    src: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/videos/3571264/pictures/preview-0.jpg",
    label: "The Magic Awaits",
  },
  // Cruise context
  cruise: {
    src: "https://videos.pexels.com/video-files/1739010/1739010-uhd_2560_1440_30fps.mp4",
    poster: "https://images.pexels.com/videos/1739010/pictures/preview-0.jpg",
    label: "Set Sail",
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────

type VideoHeroState = {
  currentKey: string;
  currentVideo: VideoEntry;
  setVideoContext: (key: string) => void;
  isTransitioning: boolean;
};

const VideoHeroContext = createContext<VideoHeroState>({
  currentKey: "landing",
  currentVideo: VIDEO_CATALOG.landing,
  setVideoContext: () => {},
  isTransitioning: false,
});

export function VideoHeroProvider({ children }: { children: ReactNode }) {
  const [currentKey, setCurrentKey] = useState("landing");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setVideoContext = useCallback((key: string) => {
    const videoKey = VIDEO_CATALOG[key] ? key : "landing";
    if (videoKey === currentKey) return;

    setIsTransitioning(true);
    // Brief transition window — the GlobalVideoBackground handles the actual crossfade
    setTimeout(() => {
      setCurrentKey(videoKey);
      setIsTransitioning(false);
    }, 150);
  }, [currentKey]);

  const currentVideo = VIDEO_CATALOG[currentKey] ?? VIDEO_CATALOG.landing;

  return (
    <VideoHeroContext.Provider value={{ currentKey, currentVideo, setVideoContext, isTransitioning }}>
      {children}
    </VideoHeroContext.Provider>
  );
}

export function useVideoHero() {
  return useContext(VideoHeroContext);
}
