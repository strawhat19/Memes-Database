import type { IconName } from '../Icon';

type LandingStep = {
  id: string;
  body: string;
  title: string;
  label: string;
  icon: IconName;
  href: `/discover` | `/saved` | `/add`;
};

export const landingSteps: LandingStep[] = [
  {
    id: `browse`,
    icon: `search`,
    href: `/discover`,
    title: `Find your funny`,
    label: `Browse the collection`,
    body: `Follow a mood, pick a category, or search for the meme you have in mind.`,
  },
  {
    id: `save`,
    href: `/saved`,
    icon: `bookmark`,
    title: `Keep the good ones`,
    label: `Open Saved Memes`,
    body: `Tap the bookmark on any card. Your favorites are ready for another laugh.`,
  },
  {
    id: `add`,
    href: `/add`,
    icon: `upload`,
    title: `Bring your own laugh`,
    label: `Add your first meme`,
    body: `Add an image, give it a title, and make it yours with a category and captions.`,
  },
];
