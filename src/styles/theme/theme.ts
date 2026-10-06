export type ThemeMode = `light` | `dark`;

export type ThemePalette = {
  ink: string;
  muted: string;
  paper: string;
  coral: string;
  lilac: string;
  border: string;
  accent: string;
  surface: string;
  primary: string;
  pistachio: string;
};

export const themePalettes: Record<ThemeMode, ThemePalette> = {
  light: {
    ink: `#25213D`,
    paper: `#FFF5ED`,
    coral: `#FF785D`,
    muted: `#716978`,
    lilac: `#B8B0F1`,
    border: `#E6DCD8`,
    accent: `#5040DC`,
    surface: `#FFFDFA`,
    primary: `#5040DC`,
    pistachio: `#BCE3AF`,
  },
  dark: {
    ink: `#FFF5ED`,
    muted: `#BBB4D2`,
    paper: `#201C39`,
    coral: `#FF785D`,
    lilac: `#B8B0F1`,
    border: `#443D5C`,
    accent: `#B8B0F1`,
    surface: `#2A2444`,
    primary: `#BCE3AF`,
    pistachio: `#BCE3AF`,
  },
};
