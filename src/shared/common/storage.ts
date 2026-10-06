import AsyncStorage from '@react-native-async-storage/async-storage';
import { serializeStorage } from './storageQueue';
import { notifyStorage, subscribeStorage } from './storageEvents';
import type { StorageUpdater } from './storageTypes';

export const readStorage = async (key: string): Promise<string | null> =>
  AsyncStorage.getItem(key);

export const updateStorage = async <T>(key: string, update: StorageUpdater<T>): Promise<T> =>
  serializeStorage(key, async () => {
    const next = await update(await AsyncStorage.getItem(key));
    await AsyncStorage.setItem(key, next.value);
    notifyStorage(key);
    return next.result;
  });

export const writeStorage = async (key: string, value: string): Promise<void> =>
  updateStorage(key, () => ({ value, result: undefined }));

export const removeStorage = async (key: string): Promise<void> =>
  serializeStorage(key, async () => {
    await AsyncStorage.removeItem(key);
    notifyStorage(key);
  });

export const watchStorage = subscribeStorage;
