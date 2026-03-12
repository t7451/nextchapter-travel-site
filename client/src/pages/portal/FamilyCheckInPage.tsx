import { FamilyCheckIn } from "@/pages/portal/FamilyCheckIn";
import PortalLayout from "@/components/PortalLayout";

export default function FamilyCheckInPage() {
  return (
    <PortalLayout
      title="Family Check-in"
      subtitle="Real-time family safety and location sharing"
    >
      <FamilyCheckIn />
    </PortalLayout>
  );
}
