-- Seed initial pledges
INSERT INTO public.pledges (donor_name, amount, charity_name, bet_choice, created_at) VALUES
  ('Sarah J.', 100, 'Cancer Council', 'FOR', NOW() - INTERVAL '5 days'),
  ('Mark P.', 250, 'RSPCA', 'AGAINST', NOW() - INTERVAL '4 days'),
  ('Emily R.', 50, 'Beyond Blue', 'FOR', NOW() - INTERVAL '3 days'),
  ('David Chen', 500, 'Fred Hollows Foundation', 'AGAINST', NOW() - INTERVAL '2 days'),
  ('Jessica L.', 75, 'OzHarvest', 'FOR', NOW() - INTERVAL '1 day');

-- Seed initial training updates
INSERT INTO public.updates (date, title, content, created_at) VALUES
  ('Oct 5, 2025', 'The First Long Run', 'Completed our first 15-mile run today. It was brutal, humbling, and a stark reminder of the mountain we have to climb. The support is already incredible!', NOW() - INTERVAL '2 days'),
  ('Sep 28, 2025', 'Nutrition Planning', 'Met with a nutritionist this week. Turns out you can''t survive 100 miles on jelly beans alone. Who knew? The learning curve is steep.', NOW() - INTERVAL '9 days'),
  ('Sep 21, 2025', 'We''ve Officially Started!', 'The training begins. We''re both excited and terrified. Thank you to everyone who has pledged already. Your belief (or disbelief) is our fuel.', NOW() - INTERVAL '16 days');
