const queues = new Map<string, Promise<void>>();

export const serializeStorage = async <T>(
  key: string,
  operation: () => Promise<T>,
): Promise<T> => {
  const previous = queues.get(key) ?? Promise.resolve();
  const next = previous.then(operation, operation);
  const settled = next.then(() => undefined, () => undefined);
  queues.set(key, settled);
  try {
    return await next;
  } finally {
    if (queues.get(key) === settled) queues.delete(key);
  }
};
