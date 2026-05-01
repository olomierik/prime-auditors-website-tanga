export type ContactPayload = {
  name: string;
  email: string;
  phone_number?: string;
  company_name?: string;
  company?: string;
  message: string;
  to_email?: string;
};

export async function submitContact(payload: ContactPayload): Promise<{ ok: boolean; error?: string }> {
  // Resolve endpoint: first try env var, then try runtime config (config.json)
  let endpoint = (process.env.NEXT_PUBLIC_CONTACT_ENDPOINT as string) ?? '';
  if (!endpoint) {
    try {
      const cfgRes = await fetch('/config.json');
      if (cfgRes.ok) {
        const cfg = await cfgRes.json();
        endpoint = cfg?.VITE_CONTACT_ENDPOINT ?? '';
      }
    } catch {}
  }
  if (!endpoint) {
    return { ok: false, error: 'Contact endpoint not configured. Please set VITE_CONTACT_ENDPOINT in environment or provide config.json on host.' };
  }
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text || 'Network error' };
    }
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err?.message ?? 'Unknown error' };
  }
}

export default submitContact;
