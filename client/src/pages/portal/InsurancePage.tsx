import PortalLayout from "@/components/PortalLayout";
import { TravelInsurance } from "./TravelInsurance";

export default function InsurancePage() {
  return (
    <PortalLayout title="Travel Insurance" subtitle="Coverage Details">
      <TravelInsurance />
    </PortalLayout>
  );
}
