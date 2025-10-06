import { getPayload } from "./payload"

export async function getHeroContent() {
  const payload = await getPayload()
  const result = await payload.find({
    collection: "hero",
    limit: 1,
  })

  return result.docs[0] || null
}

export async function getStoryContent() {
  const payload = await getPayload()
  const result = await payload.find({
    collection: "story",
    limit: 1,
  })

  return result.docs[0] || null
}

export async function getUpdates() {
  const payload = await getPayload()
  const result = await payload.find({
    collection: "updates",
    sort: "-date",
    limit: 10,
  })

  return result.docs
}
