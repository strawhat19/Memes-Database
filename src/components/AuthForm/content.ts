export type AuthMode = `signin` | `signup`;
export type AuthFormProps = { mode: AuthMode };

export const authContent = {
  signin: {
    action: `Sign In`,
    title: `Welcome back.`,
    eyebrow: `A familiar kind of funny`,
    subtitle: `Your next favorite meme is waiting.`,
  },
  signup: {
    action: `Sign Up`,
    title: `Make yourself at home.`,
    eyebrow: `Good laughs, good company`,
    subtitle: `A little corner of the internet for your kind of funny.`,
  },
} as const;

export const accountNotice = `Account access is coming soon. You can keep browsing the archive.`;
