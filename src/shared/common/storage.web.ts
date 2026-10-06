import { serializeStorage } from './storageQueue';
import { notifyStorage, subscribeStorage } from './storageEvents';
import type { StorageUpdater } from './storageTypes';

type BrowserLockManager = {
  request: <T>(name: string, operation: () => Promise<T>) => Promise<T>;
};

const browserStorage = (): Storage => {
  if (typeof window === `undefined`) {
    throw new Error(`Browser storage is unavailable in this environment`);
  }
  return window.localStorage;
};

const withBrowserLock = async <T>(key: string, operation: () => Promise<T>): Promise<T> => {
  const browserNavigator = typeof navigator === `undefined`
    ? undefined
    : navigator as unknown as { locks?: BrowserLockManager };
  if (browserNavigator?.locks?.request) {
    return browserNavigator.locks.request(`memes-database:${key}`, operation);
  }
  return operation();
};

export const readStorage = async (key: string): Promise<string | null> =>
  browserStorage().getItem(key);

export const updateStorage = async <T>(key: string, update: StorageUpdater<T>): Promise<T> =>
  serializeStorage(key, () => withBrowserLock(key, async () => {
    const storage = browserStorage();
    const next = await update(storage.getItem(key));
    storage.setItem(key, next.value);
    notifyStorage(key);
    return next.result;
  }));

export const writeStorage = async (key: string, value: string): Promise<void> =>
  updateStorage(key, () => ({ value, result: undefined }));

export const removeStorage = async (key: string): Promise<void> =>
  serializeStorage(key, () => withBrowserLock(key, async () => {
    browserStorage().removeItem(key);
    notifyStorage(key);
  }));

export const watchStorage = (key: string, listener: () => void): (() => void) => {
  const unsubscribe = subscribeStorage(key, listener);
  if (typeof window === `undefined`) return unsubscribe;
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) listener();
  };
  window.addEventListener(`storage`, onStorage);
  return () => {
    unsubscribe();
    window.removeEventListener(`storage`, onStorage);
  };
};
