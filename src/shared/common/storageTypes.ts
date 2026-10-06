export interface StorageUpdate<T> {
  result: T;
  value: string;
}

export type StorageUpdater<T> = (
  value: string | null,
) => StorageUpdate<T> | Promise<StorageUpdate<T>>;
