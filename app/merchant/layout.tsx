"use client";

import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/layouts/dashboard/bottom-nav";
import { Sidebar } from "@/components/layouts/dashboard/sidebar";
import { MERCHANT_NAV_ITEMS } from "@/components/layouts/dashboard/nav-items";
import { MerchantTopbar } from "@/components/layouts/merchant/topbar";
import { MerchantProvider, useMerchantContext } from "@/components/providers/merchant-provider";
import { useWallet } from "@/components/providers/wallet-provider";
import { AppButton } from "@/components/reuseables/button";
import { Text } from "@/components/reuseables/text";

function MerchantGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { walletAddress } = useWallet();
  const { merchant, isLoading } = useMerchantContext();

  if (pathname?.startsWith("/merchant/onboarding")) {
    return <>{children}</>;
  }

  if (!walletAddress) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="flex max-w-sm flex-col items-center gap-3 text-center">
          <Text as="h2" weight="semibold" className="text-xl">
            Connect your wallet
          </Text>
          <Text as="p" size="sm" className="text-muted-foreground">
            Connect your merchant wallet to see your dashboard.
          </Text>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <Text as="p" className="text-muted-foreground">
          Loading merchant account...
        </Text>
      </div>
    );
  }

  if (!merchant) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="flex max-w-sm flex-col items-center gap-3 text-center">
          <Text as="h2" weight="semibold" className="text-xl">
            Set up your merchant account
          </Text>
          <Text as="p" size="sm" className="text-muted-foreground">
            This wallet isn&apos;t registered as a merchant yet.
          </Text>
          <AppButton
            render={<Link href="/merchant/onboarding" />}
            nativeButton={false}
            className="rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            Get started
          </AppButton>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function MerchantLayout({ children }: LayoutProps<"/merchant">) {
  return (
    <MerchantProvider>
      <div className="flex min-h-screen flex-col">
        <MerchantTopbar />
        <div className="flex flex-1">
          <Sidebar active="Home" items={MERCHANT_NAV_ITEMS} />
          <main className="flex flex-1 bg-muted/30 p-6 pb-20 lg:pb-6">
            <Suspense>
              <MerchantGate>{children}</MerchantGate>
            </Suspense>
          </main>
        </div>
        <BottomNav active="Home" items={MERCHANT_NAV_ITEMS} />
      </div>
    </MerchantProvider>
  );
}
