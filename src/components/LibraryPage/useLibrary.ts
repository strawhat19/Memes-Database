import { useMemo, useState } from 'react';
import { memeCategories } from '../../types/types';
import type { MemeRecord } from '../../shared/models/Meme';

export const categories = memeCategories;

export const useLibrary = (memes: MemeRecord[], savedIds: string[], savedOnly: boolean) => {
  const [query, setQuery] = useState(``);
  const [category, setCategory] = useState(`All`);
  const [sort, setSort] = useState(`newest`);
  const [source, setSource] = useState(`all`);
  const filtered = useMemo(() => memes.filter(meme => {
    const matchesQuery = `${meme.title} ${meme.topText} ${meme.bottomText} ${meme.category}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesQuery && (!savedOnly || savedIds.includes(meme.id)) && (category === `All` || meme.category === category) && (source === `all` || meme.source === source);
  }).sort((first, second) => sort === `title` ? first.title.localeCompare(second.title) : sort === `oldest` ? Date.parse(first.createdAt) - Date.parse(second.createdAt) : Date.parse(second.createdAt) - Date.parse(first.createdAt)), [memes, savedIds, savedOnly, query, category, sort, source]);
  return { query, sort, source, category, filtered, setSort, setQuery, setSource, setCategory };
};
