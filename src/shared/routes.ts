export const routes = {
  api: `/api`,
  home: `/`,
  add: `/add`,
  saved: `/saved`,
  about: `/about`,
  terms: `/terms`,
  signin: `/signin`,
  signup: `/signup`,
  pricing: `/pricing`,
  contact: `/contact`,
  privacy: `/privacy`,
  discover: `/discover`,
  categories: `/categories`,
} as const;

export const routeAliases = {
  '/info': routes.about,
  '/about-us': routes.about,
  '/contact-us': routes.contact,
  '/privacy-policy': routes.privacy,
  '/terms-of-service': routes.terms,
} as const;

export const navigation = [
  { label: `About`, path: routes.about, icon: `info` },
  { label: `API`, path: routes.api, icon: `code` },
  { label: `Categories`, path: routes.categories, icon: `layers` },
  { label: `Discover`, path: routes.discover, icon: `grid` },
  { label: `Saved`, path: routes.saved, icon: `bookmark` },
  { label: `Pricing`, path: routes.pricing, icon: `layers` },
  { label: `Contact`, path: routes.contact, icon: `mail` },
] as const;
