import { useState } from 'react';
import type { MemeInput } from '../../shared/models/Meme';

export const emptyMeme: MemeInput = { image: ``, title: ``, topText: ``, category: `Relatable`, bottomText: `` };

export const useMemeForm = () => {
  const [form, setForm] = useState<MemeInput>({ ...emptyMeme });
  const [error, setError] = useState(``);
  const [reading, setReading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const update = <Key extends keyof MemeInput>(key: Key, value: MemeInput[Key]) => setForm(current => ({ ...current, [key]: value }));

  const readImage = async (file?: File) => {
    if (!file) return;
    setError(``);
    if (![ `image/png`, `image/jpeg`, `image/webp`, `image/gif` ].includes(file.type)) { setError(`Choose a PNG, JPEG, WebP, or GIF image`); return; }
    if (file.size > 1.5 * 1024 * 1024) { setError(`Choose an image smaller than 1.5 MB so your archive has room to grow`); return; }
    setReading(true);
    try {
      const image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => typeof reader.result === `string` ? resolve(reader.result) : reject(new Error(`Couldn't read this image`));
        reader.onerror = () => reject(new Error(`Couldn't read this image`));
        reader.readAsDataURL(file);
      });
      update(`image`, image);
    } catch (cause) { setError(cause instanceof Error ? cause.message : `Couldn't read this image`); }
    finally { setReading(false); }
  };

  const validate = () => {
    if (!form.title.trim()) return `Give your meme a short title`;
    if (!form.image.trim()) return `Choose an image or paste its HTTPS link`;
    if (form.image.startsWith(`data:image/`)) return ``;
    try { const url = new URL(form.image); return url.protocol === `https:` ? `` : `Use a secure HTTPS image link`; }
    catch { return `That image link doesn't look right. Use a complete HTTPS URL`; }
  };
  return { form, error, reading, submitting, setForm, setError, setSubmitting, readImage, update, validate };
};
