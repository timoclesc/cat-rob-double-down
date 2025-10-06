import type { Pledge } from "@/lib/types"

interface PledgeFeedProps {
  pledges: Pledge[]
}

export function PledgeFeed({ pledges }: PledgeFeedProps) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)

  return (
    <section id="donationsFeedContainer" className="mb-12">
      <h3 className="text-2xl font-bold text-stone-800 text-center lg:text-left mb-4">Live Pledge Feed</h3>
      <div className="bg-stone-50 border border-stone-200 rounded-lg shadow-inner h-96 overflow-y-auto p-4 space-y-3">
        {pledges.length === 0 ? (
          <p className="text-stone-500 text-center">Be the first to pledge!</p>
        ) : (
          pledges.map((pledge) => (
            <div
              key={pledge.id}
              className={`p-3 rounded-md text-sm ${
                pledge.bet_choice === "FOR"
                  ? "bg-emerald-50 border-l-4 border-emerald-500"
                  : "bg-rose-50 border-l-4 border-rose-500"
              }`}
            >
              <span className="font-bold">{pledge.donor_name}</span> pledged{" "}
              <span className="font-bold">{formatCurrency(pledge.amount)}</span> to {pledge.charity_name} (
              <span className="font-semibold">{pledge.bet_choice === "FOR" ? "FOR" : "AGAINST"}</span>)
            </div>
          ))
        )}
      </div>
    </section>
  )
}
