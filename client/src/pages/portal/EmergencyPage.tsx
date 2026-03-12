import PortalLayout from "@/components/PortalLayout";
import { EmergencyContacts } from "./EmergencyContacts";

export default function EmergencyPage() {
  return (
    <PortalLayout title="Emergency Contacts" subtitle="Critical Information">
      <EmergencyContacts />
    </PortalLayout>
  );
}
