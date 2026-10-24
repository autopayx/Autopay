import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { AppColors } from "@/lib/app_colors"

function CodePreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <span className="text-xs text-white/40">Intended interface · TypeScript</span>
      </div>

      <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed sm:text-sm">
        <code>
          <span className="text-purple-400">import</span>
          <span className="text-white/80"> {"{"} </span>
          <span className="text-sky-300">AutoPayX</span>
          <span className="text-white/80"> {"}"} </span>
          <span className="text-purple-400">from</span>
          <span className="text-white/80"> </span>
          <span className="text-emerald-400">&quot;@autopayx/sdk&quot;</span>
          <span className="text-white/80">;</span>
          {"\n\n"}
          <span className="text-purple-400">const</span>
          <span className="text-white/80"> autopayx = </span>
          <span className="text-purple-400">new</span>
          <span className="text-sky-300"> AutoPayX</span>
          <span className="text-white/80">{"({"}</span>
          {"\n  "}
          <span className="text-sky-300">network</span>
          <span className="text-white/80">: </span>
          <span className="text-emerald-400">&quot;testnet&quot;</span>
          <span className="text-white/80">,</span>
          {"\n  "}
          <span className="text-sky-300">merchantId</span>
          <span className="text-white/80">: </span>
          <span className="text-emerald-400">&quot;merchant_123&quot;</span>
          <span className="text-white/80">,</span>
          {"\n"}
          <span className="text-white/80">{"});"}</span>
          {"\n\n"}
          <span className="text-purple-400">const</span>
          <span className="text-white/80"> checkout = </span>
          <span className="text-purple-400">await</span>
          <span className="text-white/80"> autopayx.</span>
          <span className="text-yellow-200">createCheckout</span>
          <span className="text-white/80">{"({"}</span>
          {"\n  "}
          <span className="text-sky-300">planId</span>
          <span className="text-white/80">: </span>
          <span className="text-emerald-400">&quot;plan_monthly_001&quot;</span>
          <span className="text-white/80">,</span>
          {"\n"}
          <span className="text-white/80">{"});"}</span>
          {"\n\n"}
          <span className="text-white/80">console.</span>
          <span className="text-yellow-200">log</span>
          <span className="text-white/80">(checkout.url);</span>
        </code>
      </pre>
    </div>
  )
}

function Developers() {
  return (
    <section id="developers" style={{ background: AppColors.appBackgroundColor }} className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 rounded-3xl bg-[#0B1F3A] p-8 lg:grid-cols-2 lg:p-12">
          <div className="flex flex-col items-start gap-4">
            <Text as="p" size="sm" weight="semibold" className="text-blue-400 uppercase tracking-wide">
              Developers
            </Text>
            <Text as="h2" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Integrate with the SDK
            </Text>
            <Text as="p" className="text-white/70">
              Add recurring USDC billing to your site with a few lines of TypeScript.
            </Text>
            <AppButton
              nativeButton={false}
              render={<a href="https://api.autopayx.xyz/api/docs/" target="_blank" rel="noopener noreferrer" />}
              className="mt-2 rounded-full bg-white text-[#0B1F3A] hover:bg-white/90"
            >
              Read the docs
            </AppButton>
          </div>

          <CodePreview />
        </div>
      </div>
    </section>
  )
}

export { Developers }
