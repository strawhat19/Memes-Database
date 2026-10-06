import { createRecordId, parseRecordId } from '../shared/common/ids';
import { getErrorMessage, isObject } from '../shared/common/values';
import { sampleMemes } from '../shared/data/sampleMemes';
import { showSampleMemes, useLocalStorage } from '../shared/config';
import { readStorage, updateStorage } from '../shared/common/storage';
import { Meme, isMemeRecord, normalizeMemeInput } from '../shared/models';
import { Types } from '../types/types';
import type { APIHealth, APIRoute, MemeInput, MemeRecord, MemeSnapshot } from '../types/types';

export const MEMES_STORAGE_KEY = `memes-database.collection.v1`;

interface StoredMemeState {
  version: 1;
  counter: number;
  savedIds: string[];
  memes: MemeRecord[];
}

const connectionMessage = `Connect a backend before using the collection with local storage turned off`;
const unreadableMessage = `The saved collection is unreadable. It has been left unchanged. Export or correct the browser/device storage before trying again`;

const requireLocalMode = (): void => {
  if (!useLocalStorage) throw new Error(connectionMessage);
};

const emptyState = (): StoredMemeState => ({
  version: 1,
  counter: 0,
  memes: [],
  savedIds: [],
});

const readState = (serialized: string | null): StoredMemeState => {
  if (serialized === null) return emptyState();
  let value: unknown;
  try { value = JSON.parse(serialized); } catch { throw new Error(unreadableMessage); }
  if (!isObject(value)
    || value.version !== 1
    || typeof value.counter !== `number`
    || !Number.isSafeInteger(value.counter)
    || value.counter < 0
    || !Array.isArray(value.memes)
    || !Array.isArray(value.savedIds)) {
    throw new Error(unreadableMessage);
  }
  const memes = value.memes;
  const counter = value.counter;
  const savedIds = value.savedIds;
  if (!memes.every(record => isMemeRecord(record) && record.source === `local`)
    || !savedIds.every(id => typeof id === `string` && parseRecordId(id) !== null)) {
    throw new Error(unreadableMessage);
  }
  const records = memes as MemeRecord[];
  const bookmarkIds = savedIds as string[];
  const ids = new Set(records.map(record => record.id));
  const numbers = new Set(records.map(record => record.number));
  if (ids.size !== records.length
    || numbers.size !== records.length
    || new Set(bookmarkIds).size !== bookmarkIds.length
    || records.some(record => record.number > counter)) {
    throw new Error(unreadableMessage);
  }
  return {
    version: 1,
    counter,
    savedIds: [...bookmarkIds],
    memes: records.map(record => new Meme(record).toRecord()),
  };
};

const visibleMemes = (state: StoredMemeState): MemeRecord[] => [
  ...state.memes.map(record => ({ ...record })),
  ...(showSampleMemes ? sampleMemes.map(record => ({ ...record })) : []),
].sort((first, second) => second.createdAt.localeCompare(first.createdAt));

const snapshotFromState = (state: StoredMemeState): MemeSnapshot => {
  const memes = visibleMemes(state);
  const availableIds = new Set(memes.map(record => record.id));
  return {
    memes,
    savedIds: state.savedIds.filter(id => availableIds.has(id)),
  };
};

const mutateState = async <T>(
  mutation: (state: StoredMemeState) => T,
): Promise<T> => {
  requireLocalMode();
  return updateStorage(MEMES_STORAGE_KEY, serialized => {
    const state = readState(serialized);
    const result = mutation(state);
    return { result, value: JSON.stringify(state) };
  });
};

export const getSnapshot = async (): Promise<MemeSnapshot> => {
  requireLocalMode();
  return snapshotFromState(readState(await readStorage(MEMES_STORAGE_KEY)));
};

export const getMemes = async (): Promise<MemeRecord[]> => (await getSnapshot()).memes;

export const getSavedIds = async (): Promise<string[]> => (await getSnapshot()).savedIds;

export const addMeme = async (input: MemeInput): Promise<MemeRecord> => {
  requireLocalMode();
  const values = normalizeMemeInput(input);
  return mutateState(state => {
    if (state.counter >= Number.MAX_SAFE_INTEGER) {
      throw new Error(`The local record counter has reached its limit`);
    }
    const number = state.counter + 1;
    const createdAt = new Date().toISOString();
    const record = new Meme({
      ...values,
      number,
      createdAt,
      source: `local`,
      updatedAt: createdAt,
      id: createRecordId(Types.Meme, number, values.title, createdAt),
    }).toRecord();
    state.counter = number;
    state.memes.push(record);
    return { ...record };
  });
};

export const updateMeme = async (id: string, input: MemeInput): Promise<MemeRecord> => {
  requireLocalMode();
  const values = normalizeMemeInput(input);
  return mutateState(state => {
    if (sampleMemes.some(record => record.id === id)) {
      throw new Error(`Sample memes are read-only. Add your own version to edit it`);
    }
    const index = state.memes.findIndex(record => record.id === id);
    if (index < 0) throw new Error(`This meme could not be found in your local collection`);
    const current = state.memes[index];
    const updatedAt = new Date(Math.max(Date.now(), Date.parse(current.updatedAt))).toISOString();
    const record = new Meme({
      ...current,
      ...values,
      updatedAt,
    }).toRecord();
    state.memes[index] = record;
    return { ...record };
  });
};

export const removeMeme = async (id: string): Promise<void> =>
  mutateState(state => {
    if (sampleMemes.some(record => record.id === id)) {
      throw new Error(`Sample memes are read-only and cannot be removed from the sample set`);
    }
    const index = state.memes.findIndex(record => record.id === id);
    if (index < 0) throw new Error(`This meme could not be found in your local collection`);
    state.memes.splice(index, 1);
    state.savedIds = state.savedIds.filter(savedId => savedId !== id);
  });

export const toggleSaved = async (id: string): Promise<void> =>
  mutateState(state => {
    if (!visibleMemes(state).some(record => record.id === id)) {
      throw new Error(`This meme is no longer available to save`);
    }
    state.savedIds = state.savedIds.includes(id)
      ? state.savedIds.filter(savedId => savedId !== id)
      : [...state.savedIds, id];
  });

export const clearSaved = async (): Promise<void> =>
  mutateState(state => { state.savedIds = []; });

const operationRegistry: readonly APIRoute[] = [
  { path: `/api`, methods: [`GET`], operation: `getDirectory`, description: `Describe the internal asynchronous service and its actual storage mode` },
  { path: `/api/health`, methods: [`GET`], operation: `getHealth`, description: `Report local storage availability or the missing backend connection` },
  { path: `/api/status`, methods: [`GET`], operation: `getHealth`, description: `The same honest service status, without fabricated runtime statistics` },
  { path: `/api/memes`, methods: [`GET`, `POST`], operation: `getMemes / addMeme`, description: `Read the optional sample set and local records, or add a local meme` },
  { path: `/api/memes/:id`, methods: [`PATCH`, `DELETE`], operation: `updateMeme / removeMeme`, description: `Update or remove local records while keeping IDs and numbers stable` },
  { path: `/api/saved`, methods: [`GET`, `DELETE`], operation: `getSavedIds / clearSaved`, description: `Read or clear this browser/device's saved meme IDs` },
  { path: `/api/saved/:id`, methods: [`POST`], operation: `toggleSaved`, description: `Save or unsave an available meme` },
];

export const getRoutes = async (): Promise<APIRoute[]> =>
  operationRegistry.map(route => ({ ...route, methods: [...route.methods] }));

export const getHealth = async (): Promise<APIHealth> => {
  const base = {
    title: `Memes Database Internal API`,
    timestamp: new Date().toISOString(),
    transport: `internal-service` as const,
  };
  if (!useLocalStorage) {
    return { ...base, success: false, mode: `connection-needed`, message: connectionMessage };
  }
  try {
    readState(await readStorage(MEMES_STORAGE_KEY));
    return {
      ...base,
      mode: `local`,
      success: true,
      message: `Local browser or device storage can be read. No remote backend is connected`,
    };
  } catch (error) {
    return { ...base, mode: `local`, success: false, message: getErrorMessage(error) };
  }
};

export const getDirectory = async () => ({
  ...await getHealth(),
  operations: await getRoutes(),
});

export const memesAPI = {
  addMeme,
  getMemes,
  getRoutes,
  getHealth,
  clearSaved,
  removeMeme,
  updateMeme,
  getSavedIds,
  getSnapshot,
  toggleSaved,
  getDirectory,
};
