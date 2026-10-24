import { Suspense } from "react";
import { PlanDetailClient } from "@/components/layouts/merchant/plan-detail/client";

async function PlanDetailRoute({ params }: PageProps<"/merchant/plans/[id]">) {
  const { id } = await params;
  return <PlanDetailClient planCode={id} />;
}

export default function MerchantPlanDetailPage({ params, searchParams }: PageProps<"/merchant/plans/[id]">) {
  return (
    <Suspense>
      <PlanDetailRoute params={params} searchParams={searchParams} />
    </Suspense>
  );
}
