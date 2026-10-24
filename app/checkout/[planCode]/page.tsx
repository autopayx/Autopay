import { Suspense } from "react";
import { CheckoutFlow } from "@/components/layouts/checkout/checkout-flow";

async function CheckoutRoute({ params }: PageProps<"/checkout/[planCode]">) {
  const { planCode } = await params;
  return <CheckoutFlow planCode={planCode} />;
}

export default function CheckoutPage({ params, searchParams }: PageProps<"/checkout/[planCode]">) {
  return (
    <Suspense>
      <CheckoutRoute params={params} searchParams={searchParams} />
    </Suspense>
  );
}
