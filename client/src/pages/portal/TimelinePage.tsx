import PortalLayout from "@/components/PortalLayout";
import { TravelTimeline } from "./TravelTimeline";

export default function TravelTimelinePage() {
  return (
    <PortalLayout title="Travel Timeline" subtitle="Countdown & Schedule">
      <TravelTimeline />
    </PortalLayout>
  );
}
