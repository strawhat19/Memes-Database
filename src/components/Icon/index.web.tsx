export type IconName = `add` | `grid` | `layers` | `sun` | `moon` | `bookmark` | `search` | `left` | `right` | `up` | `close` | `menu` | `info` | `code` | `mail` | `user` | `trash` | `edit` | `upload` | `image` | `spark` | `external` | `check`;

const paths: Record<IconName, string> = {
  up: `M12 20V4M5 11l7-7 7 7`,
  add: `M12 4v16M4 12h16`,
  menu: `M4 6h16M4 12h16M4 18h16`,
  mail: `M3 5h18v14H3Zm0 0 9 7 9-7`,
  close: `m6 6 12 12M18 6 6 18`,
  check: `m5 12 4 4L19 6`,
  right: `M4 12h16M14 6l6 6-6 6`,
  left: `M20 12H4M10 6l-6 6 6 6`,
  upload: `M12 16V3M6 9l6-6 6 6M4 16v5h16v-5`,
  bookmark: `M6 4h12v17l-6-4-6 4Z`,
  spark: `m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z`,
  search: `M17 17l4 4M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0`,
  moon: `M20 15a9 9 0 0 1-11-11A9 9 0 1 0 20 15Z`,
  info: `M12 11v6M12 7v.1M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0`,
  user: `M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-2a8 8 0 0 1 16 0v2`,
  trash: `M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7`,
  edit: `m14 5 5 5M4 20l5-1L21 7l-4-4L5 15Z`,
  code: `M8 7l-5 5 5 5m8-10 5 5-5 5M14 3l-4 18`,
  image: `M3 4h18v16H3Zm0 12 5-5 5 5 3-3 5 5M16 8h.1`,
  external: `M14 4h6v6M20 4l-9 9M10 4H4v16h16v-6`,
  sun: `M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19`,
  grid: `M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z`,
  layers: `M12 3 22 8 12 13 2 8ZM2 12l10 5 10-5M2 16l10 5 10-5`,
};

export const Icon = ({ name, className = `` }: { name: IconName; className?: string }) => (
  <svg className={`icon ${className}`} viewBox={`0 0 24 24`} aria-hidden={`true`}>
    <path d={paths[name]} />
  </svg>
);
