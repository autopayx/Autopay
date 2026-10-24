import { Suspense } from "react";
import { SubscriptionDetailClient } from "@/components/layouts/dashboard/subscription-detail/client";

async function SubscriptionDetailRoute({ params }: PageProps<"/dashboard/subscriptions/[id]">) {
  const { id } = await params;
  return <SubscriptionDetailClient subCode={id} />;
}

export default function SubscriptionDetailPage({ params, searchParams }: PageProps<"/dashboard/subscriptions/[id]">) {
  return (
    <Suspense>
      <SubscriptionDetailRoute params={params} searchParams={searchParams} />
    </Suspense>
  );
}
