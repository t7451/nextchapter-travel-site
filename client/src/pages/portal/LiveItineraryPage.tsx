import { LiveItinerary } from "@/pages/portal/LiveItinerary";
import PortalLayout from "@/components/PortalLayout";

export default function LiveItineraryPage() {
  return (
    <PortalLayout
      title="Live Itinerary"
      subtitle="Real-time synchronized trip schedule with family"
    >
      <LiveItinerary />
    </PortalLayout>
  );
}
