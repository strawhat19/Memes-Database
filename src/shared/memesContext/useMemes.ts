import { useContext } from 'react';
import { MemesContext } from './MemesContext';

export const useMemes = () => {
  const context = useContext(MemesContext);
  if (!context) throw new Error(`useMemes needs a MemesProvider`);
  return context;
};
