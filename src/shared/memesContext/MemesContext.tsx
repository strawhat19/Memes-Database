import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { memesAPI, MEMES_STORAGE_KEY } from '../../api';
import { getErrorMessage } from '../common/values';
import { watchStorage } from '../common/storage';
import type { MemeInput, MemeRecord, MemeSnapshot } from '../../types/types';

export interface MemesContextValue {
  memes: MemeRecord[];
  savedIds: string[];
  loading: boolean;
  error: string | null;
  notice: string | null;
  refresh: () => Promise<void>;
  dismissNotice: () => void;
  clearSaved: () => Promise<void>;
  removeMeme: (id: string) => Promise<void>;
  toggleSaved: (id: string) => Promise<void>;
  addMeme: (input: MemeInput) => Promise<MemeRecord>;
  updateMeme: (id: string, input: MemeInput) => Promise<MemeRecord>;
}

export const MemesContext = createContext<MemesContextValue | undefined>(undefined);

export const MemesProvider = ({ children }: { children: ReactNode }) => {
  const mounted = useRef(false);
  const requestVersion = useRef(0);
  const [loading, setLoading] = useState(true);
  const [memes, setMemes] = useState<MemeRecord[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const applySnapshot = useCallback((snapshot: MemeSnapshot) => {
    setMemes(snapshot.memes);
    setSavedIds(snapshot.savedIds);
    setError(null);
  }, []);

  const refresh = useCallback(async (): Promise<void> => {
    const version = ++requestVersion.current;
    if (mounted.current) setLoading(true);
    try {
      const snapshot = await memesAPI.getSnapshot();
      if (mounted.current && version === requestVersion.current) applySnapshot(snapshot);
    } catch (failure) {
      if (mounted.current && version === requestVersion.current) {
        setError(getErrorMessage(failure));
      }
    } finally {
      if (mounted.current && version === requestVersion.current) setLoading(false);
    }
  }, [applySnapshot]);

  useEffect(() => {
    mounted.current = true;
    void refresh();
    const unsubscribe = watchStorage(MEMES_STORAGE_KEY, () => { void refresh(); });
    return () => {
      unsubscribe();
      mounted.current = false;
      requestVersion.current += 1;
    };
  }, [refresh]);

  const runMutation = useCallback(async <T,>(
    operation: () => Promise<T>,
    message: string | ((snapshot: MemeSnapshot) => string),
  ): Promise<T> => {
    if (mounted.current) {
      setError(null);
      setNotice(null);
    }
    try {
      const result = await operation();
      const version = ++requestVersion.current;
      const snapshot = await memesAPI.getSnapshot();
      if (mounted.current && version === requestVersion.current) {
        applySnapshot(snapshot);
        setLoading(false);
        setNotice(typeof message === `function` ? message(snapshot) : message);
      }
      return result;
    } catch (failure) {
      if (mounted.current) {
        setLoading(false);
        setError(getErrorMessage(failure));
      }
      throw failure instanceof Error ? failure : new Error(getErrorMessage(failure));
    }
  }, [applySnapshot]);

  const addMeme = useCallback((input: MemeInput) =>
    runMutation(() => memesAPI.addMeme(input), `Meme Added`), [runMutation]);

  const updateMeme = useCallback((id: string, input: MemeInput) =>
    runMutation(() => memesAPI.updateMeme(id, input), `Meme Updated`), [runMutation]);

  const removeMeme = useCallback((id: string) =>
    runMutation(() => memesAPI.removeMeme(id), `Meme Removed`), [runMutation]);

  const toggleSaved = useCallback((id: string) =>
    runMutation(() => memesAPI.toggleSaved(id), snapshot =>
      snapshot.savedIds.includes(id) ? `Meme Saved` : `Save Removed`), [runMutation]);

  const clearSaved = useCallback(() =>
    runMutation(() => memesAPI.clearSaved(), `Saved Memes Cleared`), [runMutation]);

  const dismissNotice = useCallback(() => { setNotice(null); }, []);

  const value = useMemo<MemesContextValue>(() => ({
    memes,
    error,
    notice,
    loading,
    refresh,
    savedIds,
    addMeme,
    clearSaved,
    removeMeme,
    updateMeme,
    toggleSaved,
    dismissNotice,
  }), [
    memes,
    error,
    notice,
    loading,
    refresh,
    savedIds,
    addMeme,
    clearSaved,
    removeMeme,
    updateMeme,
    toggleSaved,
    dismissNotice,
  ]);

  return <MemesContext.Provider value={value}>{children}</MemesContext.Provider>;
};
