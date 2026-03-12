import PortalLayout from "@/components/PortalLayout";
import { WeatherAlerts } from "./WeatherAlerts";

export default function WeatherPage() {
  return (
    <PortalLayout title="Weather & Alerts" subtitle="Destination Forecast">
      <WeatherAlerts />
    </PortalLayout>
  );
}
