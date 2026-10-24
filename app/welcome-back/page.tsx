import { OnboardingTopbar } from "@/components/layouts/onboarding/topbar";
import { WelcomeBack } from "@/components/layouts/onboarding/welcome-back";

export default function WelcomeBackPage() {
  return (
    <div className="flex flex-1 flex-col">
      <OnboardingTopbar />
      <WelcomeBack />
    </div>
  );
}
