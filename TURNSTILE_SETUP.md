# Cloudflare Turnstile Setup Guide

This project uses Cloudflare Turnstile to protect the pledge form from bots and spam submissions.

## Required Environment Variables

You need to add the following environment variables to your Vercel project:

### 1. NEXT_PUBLIC_TURNSTILE_SITE_KEY
- **Type**: Public (client-side)
- **Description**: The site key for your Turnstile widget
- **How to get it**: 
  1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
  2. Navigate to Turnstile section
  3. Create a new site or use an existing one
  4. Copy the "Site Key"

### 2. TURNSTILE_SECRET_KEY
- **Type**: Secret (server-side only)
- **Description**: The secret key used to verify Turnstile tokens on the server
- **How to get it**:
  1. In the same Turnstile site settings
  2. Copy the "Secret Key"
  3. **Important**: Keep this secret and never expose it to the client

## Setup Steps

1. **Create a Cloudflare Turnstile Site**:
   - Visit https://dash.cloudflare.com/
   - Go to Turnstile
   - Click "Add Site"
   - Enter your domain (or use `localhost` for testing)
   - Choose "Managed" mode for best user experience
   - Save and copy both keys

2. **Add Environment Variables to Vercel**:
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` with your site key
   - Add `TURNSTILE_SECRET_KEY` with your secret key
   - Make sure to add them for all environments (Production, Preview, Development)

3. **Testing**:
   - For local development, create a `.env.local` file with both keys
   - The widget uses a test key by default (`1x00000000000000000000AA`) which always passes
   - Replace with your real keys for production

## How It Works

1. **Client Side** (`components/pledge-form.tsx`):
   - The Turnstile widget renders in the form
   - When the user completes the challenge, it generates a token
   - The token is included in the form submission

2. **Server Side** (`lib/actions.ts`):
   - The server receives the token from the form
   - It verifies the token with Cloudflare's API
   - Only if verification succeeds, the pledge is saved to the database

## Troubleshooting

- **Widget not showing**: Check that `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set correctly
- **Verification failing**: Ensure `TURNSTILE_SECRET_KEY` is correct and matches your site
- **CORS errors**: Make sure your domain is added to the Turnstile site configuration
- **Testing locally**: Use the test site key or add `localhost` to your Turnstile site domains
