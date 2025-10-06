-- Seed initial Payload CMS content
-- Note: This assumes Payload has created its tables. Run this after starting the app once.

-- Insert hero content
INSERT INTO hero (title, subtitle, "ctaText", "updatedAt", "createdAt")
VALUES (
  'Two Novices. One Ultra Marathon.',
  'This February, we''re running 100 miles with zero experience. Support our cause, or bet against us. Either way, charity wins.',
  'Make Your Pledge',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Insert story content
INSERT INTO story (
  "sectionTitle",
  "sectionSubtitle",
  "storyTitle",
  "storyContent",
  "twistTitle",
  "twistContent",
  "eventName",
  "eventDate",
  "eventDistance",
  "eventLocation",
  "updatedAt",
  "createdAt"
)
VALUES (
  'Our Insane Challenge',
  'From couch to 100 miles. Here''s why.',
  'The Story',
  '{"root":{"children":[{"children":[{"text":"We''re Alex and Ben, two friends who have never competed in any long-distance or endurance events. Our running experience is limited to the occasional jog around the park. So, naturally, we''ve signed up for a brutal 100-mile ultra marathon this February."}],"type":"paragraph"},{"children":[{"text":"Why? To push our absolute limits and, more importantly, to raise a substantial amount for charities that matter. This page is our platform to turn this personal challenge into a collective effort for good. Your support, whether you believe in us or not, will make a real difference."}],"type":"paragraph"}],"type":"root"}}',
  'The Twist: Bet Against Us',
  '{"root":{"children":[{"children":[{"text":"Here''s where it gets interesting. If we fail to complete the event, we will personally match every single donation made \"against\" us, up to a total of $10,000 per donor. It''s our all-or-nothing commitment. Your bet against us could double its impact."}],"type":"paragraph"}],"type":"root"}}',
  'The February Gauntlet',
  'February 22nd, 2026',
  '100 Miles (161 km)',
  'Blue Mountains, NSW, Australia',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Migrate existing updates from Supabase to Payload format
INSERT INTO updates (title, content, date, "updatedAt", "createdAt")
SELECT 
  title,
  content,
  date::timestamp,
  NOW(),
  NOW()
FROM public.updates
ON CONFLICT DO NOTHING;
