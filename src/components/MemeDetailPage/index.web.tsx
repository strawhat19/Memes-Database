import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Icon } from '../Icon';
import { RouterAnchor } from '../RouterAnchor';
import MemeCard from '../MemeCard';
import ConfirmDialog from '../ConfirmDialog';
import { useMemes } from '../../shared/memesContext/useMemes';

const MemeDetailPage = ({ id }: { id: string }) => {
  const router = useRouter();
  const { memes, loading, error, removeMeme } = useMemes();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pending, setPending] = useState(false);
  const [actionError, setActionError] = useState(``);
  const meme = memes.find(item => item.id === id);
  const remove = async () => { setPending(true); setActionError(``); try { await removeMeme(id); router.replace(`/discover`); } catch (cause) { setActionError(cause instanceof Error ? cause.message : `Couldn't remove this meme`); } finally { setPending(false); } };
  if (loading) return <section className={`page-container`}><div className={`meme-skeleton detail-skeleton`} aria-label={`Loading meme`} /></section>;
  if (!meme) return <section className={`page-container`}><div data-reveal className={`empty-state`}><Icon name={`image`} /><h1>This meme isn't here.</h1><p>{error || `It may have been removed, or it belongs to another device's private collection.`}</p><Link href={`/discover`} asChild><RouterAnchor className={`button button-primary`}><Icon name={`left`} />Back to the Archive</RouterAnchor></Link></div></section>;
  return <section id={`meme-detail-${meme.id}`} className={`page-container detail-page`} aria-labelledby={`meme-detail-title`}><Link href={`/discover`} asChild><RouterAnchor id={`detail-back-link`} className={`text-link`}><Icon name={`left`} />Back to the Archive</RouterAnchor></Link><div className={`detail-layout`}><div data-reveal className={`detail-card-wrap`}><MemeCard meme={meme} /></div><div data-reveal={`0.1`} className={`detail-copy`}><p className={`eyebrow`}>{meme.category}</p><h1 id={`meme-detail-title`}>{meme.title}</h1><p>{meme.source === `local` ? `A little piece of your collection, kept on this device.` : `An original illustration from the starter collection. Save it if it feels a little too relatable.`}</p><p className={`detail-date`}>Added {new Intl.DateTimeFormat(undefined, { dateStyle: `medium` }).format(new Date(meme.createdAt))}</p>{meme.source === `local` ? <div className={`detail-actions`}><Link href={{ pathname: `/add`, params: { edit: meme.id } }} asChild><RouterAnchor id={`edit-meme-${meme.id}`} className={`button button-secondary`}><Icon name={`edit`} />Edit Meme</RouterAnchor></Link><button id={`delete-meme-${meme.id}`} className={`button button-danger-outline`} onClick={() => setConfirmDelete(true)}><Icon name={`trash`} />Delete Meme</button></div> : <Link href={`/add`} asChild><RouterAnchor className={`button button-primary`}><Icon name={`add`} />Add Your Own</RouterAnchor></Link>}{actionError ? <p className={`error-banner`} role={`alert`}>{actionError}</p> : null}</div></div><ConfirmDialog open={confirmDelete} pending={pending} title={`Remove this meme?`} description={`This deletes the meme you added and its bookmark from this device. Keep a copy of the image if you want it later.`} confirmLabel={`Delete Meme`} onCancel={() => setConfirmDelete(false)} onConfirm={() => { void remove(); }} /></section>;
};

export default MemeDetailPage;
