import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState, type FormEvent } from 'react';
import { Icon } from '../Icon';
import { RouterAnchor } from '../RouterAnchor';
import { useMemeForm } from './useMemeForm';
import { categories } from '../LibraryPage/useLibrary';
import { useMemes } from '../../shared/memesContext/useMemes';

const AddMemePage = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ edit?: string }>();
  const { memes, loading, addMeme, updateMeme } = useMemes();
  const draft = useMemeForm();
  const [imageFailed, setImageFailed] = useState(false);
  const editId = typeof params.edit === `string` ? params.edit : ``;
  const original = editId ? memes.find(meme => meme.id === editId && meme.source === `local`) : undefined;
  useEffect(() => { if (original) draft.setForm({ image: original.image, title: original.title, topText: original.topText, category: original.category, bottomText: original.bottomText }); }, [original?.id]);
  useEffect(() => { setImageFailed(false); }, [draft.form.image]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = draft.validate();
    if (validation) { draft.setError(validation); return; }
    draft.setError(``);
    draft.setSubmitting(true);
    try {
      const input = { ...draft.form, title: draft.form.title.trim(), image: draft.form.image.trim(), topText: draft.form.topText.trim(), bottomText: draft.form.bottomText.trim() };
      const result = original ? await updateMeme(original.id, input) : await addMeme(input);
      router.replace({ pathname: `/meme`, params: { id: result.id } });
    } catch (cause) { draft.setError(cause instanceof Error ? cause.message : `Couldn't keep this meme. Please try again`); }
    finally { draft.setSubmitting(false); }
  };

  if (editId && !loading && !original) return <section className={`page-container`}><div data-reveal className={`empty-state`}><h1>This meme can't be edited here.</h1><p>You can edit the memes you added to this device.</p><Link href={`/discover`} asChild><RouterAnchor className={`button button-primary`}>Back to the Archive<Icon name={`right`} /></RouterAnchor></Link></div></section>;

  return (
    <section id={`add-meme-page`} className={`page-container`} aria-labelledby={`add-meme-title`}>
      <div className={`page-heading`}><div><p data-reveal className={`eyebrow`}>{original ? `A little fine-tuning` : `Make room for another laugh`}</p><h1 key={original ? `edit` : `add`} data-split-text={`words`} id={`add-meme-title`}>{original ? `Make it a keeper.` : `Add to the archive.`}</h1><p data-reveal>Your own meme, kept privately on this device. No sign-in needed.</p></div></div>
      <div id={`add-meme-layout`} className={`add-meme-layout`}>
        <form data-reveal={`0.06`} id={`meme-form`} className={`meme-form`} onSubmit={event => { void submit(event); }}>
          <label className={`form-field`} htmlFor={`meme-title`}><span>Title</span><input id={`meme-title`} required maxLength={100} value={draft.form.title} onChange={event => draft.update(`title`, event.target.value)} placeholder={`Give this moment a name`} /></label>
          <label className={`form-field`} htmlFor={`meme-category`}><span>Category</span><select id={`meme-category`} value={draft.form.category} onChange={event => draft.update(`category`, event.target.value as typeof draft.form.category)}>{categories.map(category => <option key={category}>{category}</option>)}</select></label>
          <div id={`image-options`} className={`image-options`}>
            <label id={`image-upload-label`} className={`upload-zone`} htmlFor={`meme-image-file`}><Icon name={`upload`} /><strong>{draft.reading ? `Reading your image…` : `Choose an image`}</strong><span>PNG, JPEG, WebP, or GIF · up to 1.5 MB</span><input id={`meme-image-file`} type={`file`} accept={`image/png,image/jpeg,image/webp,image/gif`} disabled={draft.reading || draft.submitting} onChange={event => { void draft.readImage(event.target.files?.[0]); event.target.value = ``; }} /></label>
            <span className={`input-divider`}>or use a link</span>
            <label className={`form-field`} htmlFor={`meme-image-url`}><span>HTTPS image URL</span><input id={`meme-image-url`} type={`url`} value={draft.form.image.startsWith(`data:`) ? `` : draft.form.image} onChange={event => draft.update(`image`, event.target.value)} placeholder={`https://example.com/your-meme.jpg`} /><small>Linked images load from their original site. Uploaded images stay on this device.</small></label>
            {draft.form.image.startsWith(`data:`) ? <p id={`uploaded-image-ready`} className={`form-success`}><Icon name={`check`} />Your uploaded image is ready.</p> : null}
          </div>
          <label className={`form-field`} htmlFor={`meme-top-text`}><span>Top caption <small>optional</small></span><input id={`meme-top-text`} maxLength={160} value={draft.form.topText} onChange={event => draft.update(`topText`, event.target.value)} placeholder={`ME: JUST ONE MORE…`} /></label>
          <label className={`form-field`} htmlFor={`meme-bottom-text`}><span>Bottom caption <small>optional</small></span><input id={`meme-bottom-text`} maxLength={160} value={draft.form.bottomText} onChange={event => draft.update(`bottomText`, event.target.value)} placeholder={`FAMOUS LAST WORDS`} /></label>
          {draft.error ? <p id={`meme-form-error`} className={`error-banner`} role={`alert`}>{draft.error}</p> : null}
          <div className={`form-actions`}><Link href={original ? { pathname: `/meme`, params: { id: original.id } } : `/discover`} asChild><RouterAnchor id={`cancel-meme-edit`} className={`button button-secondary`}>Cancel</RouterAnchor></Link><button id={`save-meme-submit`} className={`button button-primary`} type={`submit`} disabled={draft.reading || draft.submitting || (Boolean(editId) && loading)}><Icon name={`check`} />{draft.submitting ? `Keeping your meme…` : original ? `Save Changes` : `Add My Meme`}</button></div>
          <p className={`local-storage-hint`}>Clearing browser or app data can remove your collection. Keep a copy of images you care about.</p>
        </form>
        <aside data-reveal={`0.16`} id={`meme-live-preview`} className={`meme-live-preview`} aria-label={`Meme preview`}><p className={`eyebrow`}>Your next keeper</p><div className={`meme-card preview-card`}>{draft.form.topText ? <p className={`meme-caption`}>{draft.form.topText}</p> : null}<div className={`meme-artwork`}>{draft.form.image && !imageFailed ? <img src={draft.form.image} alt={draft.form.title || `Your meme preview`} onError={() => setImageFailed(true)} /> : <div className={`preview-image-placeholder`}><Icon name={`image`} /><span>{imageFailed ? `This image couldn't load` : `Your image goes here`}</span></div>}</div>{draft.form.bottomText ? <p className={`meme-caption`}>{draft.form.bottomText}</p> : null}<div className={`meme-meta`}><div className={`meme-meta-copy`}><span className={`meme-category`}>{draft.form.category}</span><span className={`meme-title`}>{draft.form.title || `Your meme title`}</span></div><Icon name={`bookmark`} /></div></div></aside>
      </div>
    </section>
  );
};

export default AddMemePage;
