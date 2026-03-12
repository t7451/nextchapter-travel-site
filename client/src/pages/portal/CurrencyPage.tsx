import PortalLayout from "@/components/PortalLayout";
import { CurrencyConverter } from "./CurrencyConverter";

export default function CurrencyPage() {
  return (
    <PortalLayout title="Currency Converter" subtitle="Exchange Rates">
      <CurrencyConverter />
    </PortalLayout>
  );
}
