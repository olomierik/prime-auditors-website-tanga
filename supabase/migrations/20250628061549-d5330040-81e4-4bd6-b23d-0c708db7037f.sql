
-- Create a table to store consultation requests
CREATE TABLE public.consultation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  company_name TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) - making it public for contact form submissions
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert consultation requests (public contact form)
CREATE POLICY "Anyone can submit consultation requests" 
  ON public.consultation_requests 
  FOR INSERT 
  WITH CHECK (true);

-- Only allow reading for authenticated admin users (you can modify this later)
CREATE POLICY "Admin can view consultation requests" 
  ON public.consultation_requests 
  FOR SELECT 
  USING (false); -- Set to false for now, you can update this when you add admin authentication
