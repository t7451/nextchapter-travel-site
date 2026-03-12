import PortalLayout from "@/components/PortalLayout";
import { GroupTravelCoordination } from "./GroupTravelCoordination";

export default function GroupTravelPage() {
  return (
    <PortalLayout title="Group Travel" subtitle="Coordination & Planning">
      <GroupTravelCoordination />
    </PortalLayout>
  );
}
