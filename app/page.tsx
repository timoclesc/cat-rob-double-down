import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { StorySection } from "@/components/story-section"
import { DashboardSection } from "@/components/dashboard-section"
import { PledgeForm } from "@/components/pledge-form"
import { PledgeFeed } from "@/components/pledge-feed"
import { UpdatesFeed } from "@/components/updates-feed"
import type { Pledge, DashboardStats } from "@/lib/types"
import { getHeroContent, getStoryContent, getUpdates } from "@/lib/get-content"

async function getPledges(): Promise<Pledge[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("pledges").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching pledges:", error)
    return []
  }

  return data || []
}

function calculateStats(pledges: Pledge[]): DashboardStats {
  const totalFor = pledges.filter((p) => p.bet_choice === "FOR").reduce((sum, p) => sum + p.amount, 0)

  const totalAgainst = pledges.filter((p) => p.bet_choice === "AGAINST").reduce((sum, p) => sum + p.amount, 0)

  const maxPayout = totalFor + totalAgainst + Math.min(totalAgainst, 100000);

  return { totalFor, totalAgainst, maxPayout }
}

export default async function Page() {
  const [pledges, heroContent, storyContent, updates] = await Promise.all([
    getPledges(),
    getHeroContent(),
    getStoryContent(),
    getUpdates(),
  ])

  const stats = calculateStats(pledges)

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <main>
        <HeroSection title={heroContent?.title} subtitle={heroContent?.subtitle} ctaText={heroContent?.ctaText} />
        <StorySection
          sectionTitle={storyContent?.sectionTitle}
          sectionSubtitle={storyContent?.sectionSubtitle}
          storyTitle={storyContent?.storyTitle}
          storyContent={storyContent?.storyContent}
          twistTitle={storyContent?.twistTitle}
          twistContent={storyContent?.twistContent}
          eventName={storyContent?.eventName}
          eventDate={storyContent?.eventDate}
          eventDistance={storyContent?.eventDistance}
          eventLocation={storyContent?.eventLocation}
        />
        <DashboardSection stats={stats} />
        <div className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
            <PledgeForm />
            <aside className="lg:col-span-2">
              <PledgeFeed pledges={pledges} />
              <UpdatesFeed updates={updates} />
            </aside>
          </div>
        </div>
      </main>
      <footer className="bg-stone-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Cat & Rob's Ultra Challenge. Run for a reason.</p>
        </div>
      </footer>
    </div>
  )
}
