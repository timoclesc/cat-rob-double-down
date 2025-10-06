# Payload CMS Setup Guide

Your ultra marathon charity site now includes Payload CMS for easy content management!

## What's Managed by Payload CMS

- **Hero Section**: Title, subtitle, and CTA button text
- **Story Section**: All story content, event details, and the "bet against us" twist
- **Training Updates**: Runner training updates and progress posts
- **Media**: Images and assets

## Accessing the Admin Panel

1. Navigate to `/admin` in your browser
2. Create your first admin user on first visit
3. Log in to manage all content

## Environment Variables Required

Add this to your environment variables:

\`\`\`
PAYLOAD_SECRET=your-secret-key-here-min-32-characters
\`\`\`

Generate a secure secret with:
\`\`\`bash
openssl rand -base64 32
\`\`\`

## Collections Available

### Hero
- Title (main headline)
- Subtitle (supporting text)
- CTA Text (button text)
- Background Image (optional)

### Story
- Section Title & Subtitle
- Story Title & Content (rich text)
- Twist Title & Content (rich text)
- Event Details (name, date, distance, location)

### Updates
- Title
- Content (textarea)
- Date

### Media
- Upload images for hero backgrounds and other assets

## Database

Payload uses your existing PostgreSQL database (Supabase). All CMS tables are automatically created on first run.

## Initial Content

Run the seed script to populate initial content:
\`\`\`
scripts/003_seed_payload_content.sql
\`\`\`

This migrates your existing updates and creates default hero/story content.

## User Management

- First user created becomes admin
- Additional users can be created from the admin panel
- Users collection has auth enabled for secure access

## Tips

- Edit content directly in the admin panel at `/admin`
- Changes are reflected immediately on the site
- Use rich text editor for formatted content
- Upload images through the Media collection
- Training updates are sorted by date (newest first)
