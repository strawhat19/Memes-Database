import { Text } from 'react-native';

export type IconName = `add` | `grid` | `layers` | `sun` | `moon` | `bookmark` | `search` | `left` | `right` | `up` | `close` | `menu` | `info` | `code` | `mail` | `user` | `trash` | `edit` | `upload` | `image` | `spark` | `external` | `check`;
export const Icon = ({ name }: { name: IconName; className?: string }) => <Text accessibilityElementsHidden>{name === `add` ? `+` : name === `check` ? `✓` : name === `right` ? `→` : name === `left` ? `←` : `✦`}</Text>;
