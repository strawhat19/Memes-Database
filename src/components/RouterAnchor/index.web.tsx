import { forwardRef, type AnchorHTMLAttributes } from 'react';

export type RouterAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  onPress?: unknown;
};

// Expo Router supplies native onPress alongside onClick; DOM anchors use onClick.
export const RouterAnchor = forwardRef<HTMLAnchorElement, RouterAnchorProps>(
  ({ onPress: _onPress, ...props }, ref) => <a {...props} ref={ref} />,
);

RouterAnchor.displayName = `RouterAnchor`;
