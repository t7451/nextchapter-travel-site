import PortalLayout from "@/components/PortalLayout";
import { BudgetTracker } from "./BudgetTracker";

export default function BudgetPage() {
  return (
    <PortalLayout title="Budget Tracker" subtitle="Manage Expenses">
      <BudgetTracker />
    </PortalLayout>
  );
}
