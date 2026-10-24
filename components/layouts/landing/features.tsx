import { Text } from "@/components/reuseables/text"
import { AppColors } from "@/lib/app_colors"

const CARDS = [
  {
    stat: "1",
    unit: "link",
    title: "Plans and checkout",
    description: "Create a plan, share the link. Customers see exactly what they approve.",
    area: "lg:col-start-1 lg:row-start-1",
  },
  {
    stat: "300",
    unit: "USDC",
    title: "Limits you control",
    description: "Every cap and end date is on screen before anyone approves.",
    area: "lg:col-start-2 lg:row-start-1",
  },
  {
    stat: "3 of 12",
    unit: "funded",
    title: "Vault-first funding",
    description: "Customers fund a vault once. Whatever is unspent can be withdrawn anytime.",
    area: "lg:col-start-2 lg:row-start-2",
  },
  {
    stat: "Anytime",
    unit: null,
    title: "Pause or cancel",
    description: "Customers can pause or cancel whenever they like, and unspent funds come back.",
    area: "lg:col-start-3 lg:row-start-2",
  },
]

function Features() {
  return (
    <section style={{ background: AppColors.appBackgroundColor }} className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Text as="p" size="sm" weight="semibold" className="text-center text-blue-600 uppercase tracking-wide">
          Features
        </Text>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
          <div className="flex flex-col justify-center lg:col-start-3 lg:row-start-1">
            <Text as="h2" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to bill in USDC
            </Text>
            <Text as="p" className="mt-3 text-muted-foreground">
              Plans, limits, and a vault that keeps both sides in control.
            </Text>
          </div>

          {CARDS.map((card) => (
            <div
              key={card.title}
              className={`flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm ${card.area}`}
            >
              <p className="flex items-baseline gap-1 text-3xl font-bold text-foreground">
                {card.stat}
                {card.unit && <span className="text-sm font-medium text-muted-foreground">{card.unit}</span>}
              </p>
              <Text as="h3" weight="semibold" className="mt-4">
                {card.title}
              </Text>
              <Text as="p" size="sm" className="mt-2 text-muted-foreground">
                {card.description}
              </Text>
            </div>
          ))}

          <div className="flex items-center lg:col-start-1 lg:row-start-2">
            <Text as="p" className="text-muted-foreground">
              Customers approve once, merchants get paid on schedule, and nobody is charged more
              than they agreed to.
            </Text>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Features }
