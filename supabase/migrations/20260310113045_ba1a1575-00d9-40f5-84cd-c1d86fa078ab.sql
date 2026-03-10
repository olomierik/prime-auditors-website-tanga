
-- Consultation requests table
CREATE TABLE public.consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  company_name TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit consultation requests"
  ON public.consultation_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Consultant applications table
CREATE TABLE public.consultant_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  specialization TEXT NOT NULL,
  experience TEXT NOT NULL,
  qualifications TEXT,
  cover_letter TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.consultant_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit consultant applications"
  ON public.consultant_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
