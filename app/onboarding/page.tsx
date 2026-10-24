import { ChooseRole } from "@/components/layouts/onboarding/choose-role";
import { OnboardingTopbar } from "@/components/layouts/onboarding/topbar";

export default function OnboardingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <OnboardingTopbar />
      <ChooseRole />
    </div>
  );
}
