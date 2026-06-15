-- Stores client testimonials managed through the admin portal
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  quote text NOT NULL,
  name text NOT NULL,
  role text NOT NULL,
  initials text NOT NULL,
  country_flag text NOT NULL DEFAULT '🇹🇿',
  rating integer DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read testimonials"
  ON public.testimonials FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials FOR ALL
  USING (public.has_role('admin', auth.uid()));

-- Seed initial testimonials
INSERT INTO public.testimonials (quote, name, role, initials, country_flag, rating, sort_order) VALUES
(
  'Prime Auditors provided exceptional service during our company audit. Their attention to detail and thorough knowledge of Tanzanian regulations is unmatched. Highly recommended for any business operating in East Africa.',
  'Sarah Johnson',
  'CEO, Safari Ventures Ltd',
  'SJ', '🇹🇿', 5, 1
),
(
  'As a Chinese investor setting up operations in Tanzania, Prime Auditors was absolutely invaluable. They guided us through BRELA registration, TIC licensing, and ongoing compliance. Professional, responsive, and completely trustworthy.',
  'Michael Chen',
  'Director, Sino-Africa Trading Co.',
  'MC', '🇨🇳', 5, 2
),
(
  'Outstanding tax advisory services. Prime Auditors helped us navigate Tanzania''s tax landscape and identified savings through proper planning. Their team is always knowledgeable and available whenever we need them.',
  'Ahmed Hassan',
  'CFO, Coastal Logistics Ltd',
  'AH', '🇹🇿', 5, 3
);
