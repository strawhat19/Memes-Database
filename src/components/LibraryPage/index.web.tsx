import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { RouterAnchor } from '../RouterAnchor';
import MemeCard from '../MemeCard';
import ConfirmDialog from '../ConfirmDialog';
import { categories, useLibrary } from './useLibrary';
import { useMemes } from '../../shared/memesContext/useMemes';

const LibraryPage = ({ savedOnly = false }: { savedOnly?: boolean }) => {
  const params = useLocalSearchParams<{ category?: string }>();
  const { memes, savedIds, loading, error, clearSaved, refresh } = useMemes();
  const library = useLibrary(memes, savedIds, savedOnly);
  const [confirmClear, setConfirmClear] = useState(false);
  const [pending, setPending] = useState(false);
  const [actionError, setActionError] = useState(``);
  useEffect(() => { if (typeof params.category === `string` && categories.includes(params.category as typeof categories[number])) library.setCategory(params.category); }, [params.category]);
  const clear = async () => { setPending(true); setActionError(``); try { await clearSaved(); setConfirmClear(false); } catch (cause) { setActionError(cause instanceof Error ? cause.message : `Couldn't clear saved memes`); } finally { setPending(false); } };
  const filtered = library.query || library.category !== `All` || library.source !== `all`;
  return (
    <section id={`${savedOnly ? `saved` : `discover`}-page`} className={`page-container`} aria-labelledby={`library-title`}>
      <div className={`page-heading`}><div><p data-reveal className={`eyebrow`}>{savedOnly ? `Your little collection` : `Find your kind of funny`}</p><h1 key={savedOnly ? `saved` : `discover`} data-split-text={`words`} id={`library-title`}>{savedOnly ? `The keepers.` : `The meme archive.`}</h1><p data-reveal>{savedOnly ? `The ones worth another laugh. Saved privately on this device.` : `Browse the collection, find a favorite, and keep it close.`}</p></div><Link href={`/add`} asChild><RouterAnchor id={`library-add-meme`} className={`button button-primary`}><Icon name={`add`} />Add a Meme</RouterAnchor></Link></div>
      <div data-reveal id={`library-filters`} className={`library-filters`}>
        <label id={`search-label`} className={`search-field`}><span className={`visually-hidden`}>Search memes</span><Icon name={`search`} /><input id={`meme-search`} value={library.query} onChange={event => library.setQuery(event.target.value)} placeholder={`Search for something relatable…`} type={`search`} /></label>
        <label className={`select-field`}><span>Category</span><select id={`category-filter`} value={library.category} onChange={event => library.setCategory(event.target.value)}><option value={`All`}>All categories</option>{categories.map(category => <option key={category} value={category}>{category}</option>)}</select></label>
        <label className={`select-field`}><span>Collection</span><select id={`source-filter`} value={library.source} onChange={event => library.setSource(event.target.value)}><option value={`all`}>All memes</option><option value={`local`}>My memes</option><option value={`sample`}>Starter collection</option></select></label>
        <label className={`select-field`}><span>Sort</span><select id={`sort-filter`} value={library.sort} onChange={event => library.setSort(event.target.value)}><option value={`newest`}>Newest first</option><option value={`oldest`}>Oldest first</option><option value={`title`}>Title A–Z</option></select></label>
      </div>
      <div data-reveal className={`library-summary`}><span id={`library-result-count`} aria-live={`polite`}>{loading ? `Opening the archive…` : `${library.filtered.length} meme${library.filtered.length === 1 ? `` : `s`}`}</span>{filtered ? <button id={`reset-filters`} className={`text-button`} onClick={() => { library.setQuery(``); library.setCategory(`All`); library.setSource(`all`); }}>Reset filters<Icon name={`close`} /></button> : null}{savedOnly && savedIds.length ? <button id={`clear-saved`} className={`text-button`} onClick={() => setConfirmClear(true)}><Icon name={`trash`} />Clear Saved</button> : null}</div>
      {error || actionError ? <div id={`library-error`} className={`error-banner`} role={`alert`}>{actionError || error}<button className={`text-button`} onClick={() => { void refresh().catch(() => {}); }}>Try again</button></div> : null}
      {loading ? <div className={`meme-grid`} aria-label={`Loading meme collection`}>{[0, 1, 2, 3].map(index => <div id={`meme-skeleton-${index}`} key={index} className={`meme-skeleton`} />)}</div> : library.filtered.length ? <div id={`meme-grid`} className={`meme-grid`} data-reveal-stagger={`0.08`}>{library.filtered.map(meme => <MemeCard key={meme.id} meme={meme} />)}</div> : <div data-reveal id={`library-empty`} className={`empty-state`}><Icon name={savedOnly ? `bookmark` : `search`} /><h2>{filtered ? `No memes match this mood.` : savedOnly ? `Save your first favorite.` : `A blank canvas for a good laugh.`}</h2><p>{filtered ? `Try another word or category to find something new.` : savedOnly ? `Tap the bookmark on any meme and it will be waiting here.` : `Add a meme to start your own little archive.`}</p><Link href={savedOnly ? `/discover` : `/add`} asChild><RouterAnchor className={`button button-primary`}><Icon name={savedOnly ? `spark` : `add`} />{savedOnly ? `Explore Memes` : `Add a Meme`}</RouterAnchor></Link></div>}
      <ConfirmDialog open={confirmClear} pending={pending} title={`Clear your saved list?`} description={`This removes the bookmarks on this device. It keeps the memes themselves in your archive.`} confirmLabel={`Clear Saved`} onCancel={() => setConfirmClear(false)} onConfirm={() => { void clear(); }} />
    </section>
  );
};

export default LibraryPage;
