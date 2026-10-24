import { BottomNav } from "@/components/layouts/dashboard/bottom-nav";
import { Sidebar } from "@/components/layouts/dashboard/sidebar";
import { OnboardingTopbar } from "@/components/layouts/onboarding/topbar";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="flex min-h-screen flex-col">
      <OnboardingTopbar />
      <div className="flex flex-1">
        <Sidebar active="Home" />
        <main className="flex flex-1 bg-muted/30 p-6 pb-20 lg:pb-6">{children}</main>
      </div>
      <BottomNav active="Home" />
    </div>
  );
}
