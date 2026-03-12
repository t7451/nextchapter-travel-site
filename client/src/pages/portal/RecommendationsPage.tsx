import PortalLayout from "@/components/PortalLayout";
import { RestaurantActivityRecommendations } from "./RestaurantActivityRecommendations";

export default function RecommendationsPage() {
  return (
    <PortalLayout title="Recommendations" subtitle="Places to Visit">
      <RestaurantActivityRecommendations />
    </PortalLayout>
  );
}
