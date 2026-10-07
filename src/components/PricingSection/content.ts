import type { IconName } from '../Icon';

export type PricingPlan = {
  id: string;
  name: string;
  label: string;
  icon: IconName;
  price: number | null;
  audience: string;
  featured: boolean;
  features: string[];
  description: string;
  href: `/discover` | `/contact`;
  tone: `muted` | `pistachio` | `lilac` | `coral`;
};

export const pricingPlans: PricingPlan[] = [
  {
    price: 0,
    id: `free`,
    icon: `sun`,
    name: `Free`,
    tone: `muted`,
    featured: false,
    href: `/discover`,
    label: `Explore Free`,
    audience: `For the casual scroller`,
    description: `A little browsing. A few keepers. A whole lot of laughs.`,
    features: [
      `Browse every category`,
      `Search and filter memes`,
      `Add your own memes`,
      `Save favorites on this device`,
      `Explore without an account`,
    ],
  },
  {
    price: 9,
    id: `memer`,
    name: `Memer`,
    icon: `bookmark`,
    tone: `pistachio`,
    featured: false,
    href: `/contact`,
    label: `Get In Touch`,
    audience: `For the dedicated collector`,
    description: `Give your favorite kind of funny a little more room.`,
    features: [
      `Everything in Free`,
      `Themed meme collections`,
      `A personal meme profile`,
      `Follow your favorite creators`,
      `Sync favorites across devices`,
    ],
  },
  {
    price: 29,
    icon: `edit`,
    id: `maker`,
    name: `Maker`,
    tone: `lilac`,
    featured: true,
    href: `/contact`,
    label: `Get In Touch`,
    audience: `For the meme makers`,
    description: `Turn your next bright idea into somebody's favorite meme.`,
    features: [
      `Everything in Memer`,
      `Custom meme templates`,
      `Batch caption tools`,
      `Schedule meme drops`,
      `Creator insights`,
    ],
  },
  {
    price: 79,
    id: `master`,
    icon: `layers`,
    tone: `coral`,
    name: `Master`,
    featured: false,
    href: `/contact`,
    label: `Get In Touch`,
    audience: `For teams & power memers`,
    description: `A bigger toolkit for your next big inside joke.`,
    features: [
      `Everything in Maker`,
      `Shared team collections`,
      `Team roles and permissions`,
      `Bulk import and export`,
      `Developer API access`,
      `Priority support`,
    ],
  },
];

export const getPlanPrice = (plan: PricingPlan) => ({
  value: plan.price === null ? `Coming Soon` : `$${plan.price}`,
  period: plan.price === null ? `` : plan.price === 0 ? `forever` : `/ month`,
  detail: plan.price === null ? `Pricing to be announced` : plan.price === 0 ? `No subscription required` : `Planned monthly price · USD`,
});

export const pricingNote = `Free is available now. Paid plans and features are coming soon. Prices are in USD.`;
