import { useEffect } from 'react';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string; // og:image
  url?: string; // og:url
  ogType?: string;
};

function setMeta(nameOrProperty: 'name' | 'property', key: string, value: string) {
  const selector = nameOrProperty === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(nameOrProperty, key);
    document.head.appendChild(el);
  }
  el.setAttribute(nameOrProperty, key);
  el.setAttribute('content', value);
  return el;
}

export default function SEO({ title, description, image, url, ogType = 'website' }: SEOProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        document.head.appendChild(m);
        m.setAttribute('content', description);
      } else {
        meta.setAttribute('content', description);
      }
    }
    // Open Graph / Twitter meta (dynamic)
    const ogTitle = title || '';
    const ogDescription = description || '';
    if (ogTitle) setMeta('property', 'og:title', ogTitle);
    if (ogDescription) setMeta('property', 'og:description', ogDescription);
    if (image) setMeta('property', 'og:image', image);
    const loc = typeof window !== 'undefined' ? window.location.href : url || '';
    if (loc) setMeta('property', 'og:url', loc);
    setMeta('property', 'og:type', ogType);

    // Twitter card meta
    if (image) {
      setMeta('name', 'twitter:card', 'summary_large_image');
      setMeta('name', 'twitter:title', ogTitle);
      setMeta('name', 'twitter:description', ogDescription);
      setMeta('name', 'twitter:image', image);
    }
  }, [title, description, image, url, ogType]);
  return null;
}
