import {
  type JSXConvertersFunction,
  RichText,
} from '@payloadcms/richtext-lexical/react'
import type {
  DefaultNodeTypes,
  SerializedTextNode,
} from '@payloadcms/richtext-lexical'

interface StorySectionProps {
  sectionTitle?: string
  sectionSubtitle?: string
  storyTitle?: string
  storyContent?: any
  twistTitle?: string
  twistContent?: any
  eventName?: string
  eventDate?: string
  eventDistance?: string
  eventLocation?: string
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters
}) => ({
  ...defaultConverters,
  // Override the default link converter
  link: ({ node }) => {
    return (
      <a className="border-b-current border-b-2 hover:border-b-neutral-300 transition-colors" href={node.fields.url} target={node.fields.newTab ? '_blank' : undefined}>
        {node.children.map( node => (node as SerializedTextNode).text)}
      </a>
    )
  },
})

function renderRichText(content: any): string {
  if (!content) return ""
  if (typeof content === "string") return content

  // Simple Lexical rich text renderer
  if (content.root?.children) {
    return content.root.children
      .map((node: any) => {
        if (node.type === "paragraph" && node.children) {
          return node.children.map((child: any) => child.text || "").join("")
        }
        return ""
      })
      .join("\n\n")
  }

  return ""
}

export function StorySection({
  sectionTitle,
  sectionSubtitle,
  storyTitle,
  storyContent,
  twistTitle,
  twistContent,
  eventName,
  eventDate,
  eventDistance,
  eventLocation,
}: StorySectionProps) {
  const storyText = renderRichText(storyContent)
  const twistText = renderRichText(twistContent)

  return (
    <section id="story" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">{sectionTitle || "Our Insane Challenge"}</h2>
          <p className="mt-3 text-lg text-stone-600">{sectionSubtitle || "From couch to 100 miles. Here's why."}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">{storyTitle || "The Story"}</h3>
            {storyContent ? <RichText converters={jsxConverters} data={storyContent} /> : storyText.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="text-stone-600 leading-relaxed mb-4">
                { paragraph ??
                  "We're Alex and Ben, two friends who have never competed in any long-distance or endurance events. Our running experience is limited to the occasional jog around the park. So, naturally, we've signed up for a brutal 100-mile ultra marathon this February."}
              </p>
            ))}
            <h3 className="text-2xl font-semibold mt-8 mb-4">{twistTitle || "The Twist: Bet Against Us"}</h3>
            { twistContent ? <RichText converters={jsxConverters} data={twistContent} /> : twistText.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="text-stone-600 leading-relaxed mb-4">
                {paragraph ||
                  "Here's where it gets interesting. If we fail to complete the event, we will personally match every single donation made 'against' us, up to a total of $10,000 per donor. It's our all-or-nothing commitment. Your bet against us could double its impact."}
              </p>
            ))}
          </div>
          <div className="bg-stone-100 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6 text-center">The Event</h3>
            <ul className="space-y-4 text-stone-700">
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-3 mt-1">🏃</span>
                <div>
                  <strong className="block">Event Name:</strong> {eventName || "The February Gauntlet"}
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-3 mt-1">📅</span>
                <div>
                  <strong className="block">Date:</strong> {eventDate || "February 22nd, 2026"}
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-3 mt-1">📏</span>
                <div>
                  <strong className="block">Distance:</strong> {eventDistance || "100 Miles (161 km)"}
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-3 mt-1">🏔️</span>
                <div>
                  <strong className="block">Location:</strong> {eventLocation || "Blue Mountains, NSW, Australia"}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
