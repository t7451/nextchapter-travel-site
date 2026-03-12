import PortalLayout from "@/components/PortalLayout";
import { TravelDocumentStorage } from "./TravelDocumentStorage";

export default function TravelDocumentsPage() {
  return (
    <PortalLayout title="Travel Documents" subtitle="Secure Storage">
      <TravelDocumentStorage />
    </PortalLayout>
  );
}
