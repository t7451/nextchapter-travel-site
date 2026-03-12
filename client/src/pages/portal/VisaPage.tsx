import PortalLayout from "@/components/PortalLayout";
import { VisaChecklist } from "./VisaChecklist";

export default function VisaPage() {
  return (
    <PortalLayout title="Visa Checklist" subtitle="Documentation Requirements">
      <VisaChecklist />
    </PortalLayout>
  );
}
