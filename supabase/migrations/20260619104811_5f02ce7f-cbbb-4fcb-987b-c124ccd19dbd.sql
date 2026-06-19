
-- Admin SELECT on consultant_applications
CREATE POLICY "Admins can view consultant applications"
ON public.consultant_applications FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin SELECT on consultation_requests
CREATE POLICY "Admins can view consultation requests"
ON public.consultation_requests FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin-only INSERT/DELETE on user_roles
CREATE POLICY "Admins can assign roles"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can remove roles"
ON public.user_roles FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Storage UPDATE policy for investor-files owners
CREATE POLICY "Investors can update own investor files"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'investor-files' AND (storage.foldername(name))[1] = auth.uid()::text)
WITH CHECK (bucket_id = 'investor-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Tighten EXECUTE privileges on SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
