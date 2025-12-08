-- Create pledges table to store all donation pledges
CREATE TABLE IF NOT EXISTS public.pledges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT NOT NULL,
  donor_email TEXT,
  amount INTEGER NOT NULL CHECK (amount > 0),
  charity_name TEXT NOT NULL,
  bet_choice TEXT NOT NULL CHECK (bet_choice IN ('FOR', 'AGAINST')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updates table for training updates
CREATE TABLE IF NOT EXISTS public.training_updates (
  id serial PRIMARY KEY NOT NULL,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on pledges table (public read access, no auth required for this charity site)
ALTER TABLE public.pledges ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read pledges
CREATE POLICY "pledges_select_all"
  ON public.pledges FOR SELECT
  USING (true);

-- Allow anyone to insert pledges (no auth required for donations)
CREATE POLICY "pledges_insert_all"
  ON public.pledges FOR INSERT
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_pledges_created_at ON public.pledges(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_updates_created_at ON public.training_updates(created_at DESC);
