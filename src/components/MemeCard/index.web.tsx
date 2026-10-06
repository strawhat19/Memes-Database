import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { RouterAnchor } from '../RouterAnchor';
import type { MemeRecord } from '../../shared/models/Meme';
import { useMemes } from '../../shared/memesContext/useMemes';

const MemeCard = ({ meme, active = true, carousel = false }: { meme: MemeRecord; active?: boolean; carousel?: boolean }) => {
  const { savedIds, toggleSaved } = useMemes();
  const [failedImage, setFailedImage] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(``);
  const saved = savedIds.includes(meme.id);
  const samplePhoto = meme.source === `sample` && /\.(?:png|jpe?g|webp)(?:[?#].*)?$/i.test(meme.image);
  const coffeePhoto = samplePhoto && meme.image.includes(`monday-loading`);
  useEffect(() => { setFailedImage(false); }, [meme.image]);

  const save = async () => {
    setPending(true);
    setError(``);
    try { await toggleSaved(meme.id); }
    catch (cause) { setError(cause instanceof Error ? cause.message : `Couldn't save this meme`); }
    finally { setPending(false); }
  };

  return (
    <article id={`${carousel ? `featured` : `library`}-meme-${meme.id}`} className={`meme-card ${carousel ? `carousel-card` : ``} ${active ? `is-active` : ``} ${meme.source === `sample` ? `sample-card` : ``} ${samplePhoto ? `sample-photo-card` : ``} ${coffeePhoto ? `coffee-photo-card` : ``}`} data-source={meme.source} aria-hidden={carousel && !active ? true : undefined}>
      <Link href={{ pathname: `/meme`, params: { id: meme.id } }} asChild>
        <RouterAnchor id={`${carousel ? `featured` : `library`}-meme-link-${meme.id}`} className={`meme-art-link`} tabIndex={active ? 0 : -1} aria-label={`View ${meme.title}`}>
          {meme.topText ? <p id={`meme-top-${carousel ? `featured-` : ``}${meme.id}`} className={`meme-caption meme-caption-top`}>{samplePhoto ? meme.topText.split(/\s+/).map((word, index) => <span id={`meme-word-${carousel ? `featured-` : ``}${meme.id}-${index}`} key={index}>{`${word} `}</span>) : meme.topText}</p> : null}
          {coffeePhoto ? <span id={`meme-loading-gag-${carousel ? `featured-` : ``}${meme.id}`} className={`meme-loading-gag`} aria-hidden={`true`}>{[0, 1, 2, 3, 4].map(segment => <i key={segment} />)}</span> : null}
          <div id={`meme-art-${carousel ? `featured-` : ``}${meme.id}`} className={`meme-artwork`}>
            {failedImage ? <div className={`image-fallback`}><Icon name={`image`} /><span>Image unavailable</span></div> : <img id={`meme-image-${carousel ? `featured-` : ``}${meme.id}`} src={meme.image} alt={meme.title} loading={carousel ? `eager` : `lazy`} onError={() => setFailedImage(true)} />}
          </div>
          {meme.bottomText ? <p id={`meme-bottom-${carousel ? `featured-` : ``}${meme.id}`} className={`meme-caption meme-caption-bottom`}>{meme.bottomText}</p> : null}
        </RouterAnchor>
      </Link>
      <div id={`meme-meta-${carousel ? `featured-` : ``}${meme.id}`} className={`meme-meta`}>
        <div className={`meme-meta-copy`}><span className={`meme-category`}>{meme.category}</span><span className={`meme-title`}>{meme.title}</span></div>
        <button id={`save-${carousel ? `featured-` : ``}${meme.id}`} className={`icon-button bookmark-button ${saved ? `is-saved` : ``}`} aria-label={`${saved ? `Unsave` : `Save`} ${meme.title}`} aria-pressed={saved} tabIndex={active ? 0 : -1} disabled={pending} onClick={() => { void save(); }}><Icon name={saved ? `check` : `bookmark`} /></button>
      </div>
      {error ? <p id={`meme-error-${carousel ? `featured-` : ``}${meme.id}`} className={`inline-error`} role={`alert`}>{error}</p> : null}
    </article>
  );
};

export default MemeCard;
