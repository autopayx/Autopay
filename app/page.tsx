import type { Metadata } from "next";
import { Developers } from "@/components/layouts/landing/developers";
import { Features } from "@/components/layouts/landing/features";
import { FinalCta } from "@/components/layouts/landing/final-cta";
import { Footer } from "@/components/layouts/landing/footer";
import { Hero } from "@/components/layouts/landing/hero";
import { HowItWorks } from "@/components/layouts/landing/how-it-works";
import { PickYourWayIn } from "@/components/layouts/landing/pick-your-way-in";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <HowItWorks />
      <Features />
      <PickYourWayIn />
      <Developers />
      <FinalCta />
      <Footer />
    </div>
  );
}
