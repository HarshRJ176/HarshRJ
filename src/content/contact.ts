import { profile } from './profile';

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
}

export function buildMailtoHref(email: string, subject = 'Aerospace portfolio inquiry'): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export const contactChannels: ContactChannel[] = [
  {
    label: 'Address',
    value: profile.contact.address,
    href: `https://www.google.com/maps/search/${encodeURIComponent(profile.contact.address)}`,
  },
  {
    label: 'Email',
    value: profile.contact.email,
    href: buildMailtoHref(profile.contact.email),
  },
  {
    label: 'Phone',
    value: profile.contact.phone,
    href: `tel:${profile.contact.phone.replace(/\s+/g, '')}`,
  },
  {
    label: 'Website',
    value: profile.contact.website,
    href: `https://${profile.contact.website}`,
  },
  {
    label: 'LinkedIn',
    value: profile.contact.linkedin,
    href: `https://${profile.contact.linkedin}`,
  },
  {
    label: 'GitHub',
    value: profile.contact.github,
    href: `https://${profile.contact.github}`,
  },
  {
    label: 'Resume',
    value: 'Download PDF',
    href: profile.contact.resume,
  },
].filter((channel) => channel.value.trim().length > 0);
