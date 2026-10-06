const listeners = new Map<string, Set<() => void>>();

export const subscribeStorage = (key: string, listener: () => void): (() => void) => {
  const subscribers = listeners.get(key) ?? new Set<() => void>();
  subscribers.add(listener);
  listeners.set(key, subscribers);
  return () => {
    subscribers.delete(listener);
    if (!subscribers.size) listeners.delete(key);
  };
};

export const notifyStorage = (key: string): void => {
  listeners.get(key)?.forEach(listener => {
    // A subscriber failure cannot turn an already committed write into a failed write.
    try { listener(); } catch { /* Consumers surface their own refresh errors. */ }
  });
};
