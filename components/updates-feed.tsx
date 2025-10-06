import { format } from "date-fns"

interface Update {
  id: string | number
  title: string
  content: string
  date: string
}

interface UpdatesFeedProps {
  updates: Update[]
}

export function UpdatesFeed({ updates }: UpdatesFeedProps) {
  return (
    <section id="updates">
      <h3 className="text-2xl font-bold text-stone-800 text-center lg:text-left mb-4">Our Training Updates</h3>
      <div className="space-y-6">
        {updates.map((update) => (
          <div key={update.id} className="bg-stone-100 p-4 rounded-lg shadow">
            <p className="text-xs text-stone-500 font-medium">{format(new Date(update.date), "MMMM d, yyyy")}</p>
            <h4 className="font-bold text-md mt-1">{update.title}</h4>
            <p className="text-sm text-stone-600 mt-2">{update.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
