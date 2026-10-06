import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, TextInput, View } from 'react-native';
import { categories } from '../LibraryPage/useLibrary';
import { NativeButton, NativePage } from '../NativePage';
import type { MemeInput } from '../../shared/models/Meme';
import { nativeStyles as styles } from '../NativePage/styles.native';
import { useTheme } from '../../shared/themeContext/useTheme';
import { useMemes } from '../../shared/memesContext/useMemes';

const AddMemePage = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ edit?: string }>();
  const { palette } = useTheme();
  const { memes, loading, addMeme, updateMeme } = useMemes();
  const [form, setForm] = useState<MemeInput>({ title: ``, image: ``, topText: ``, bottomText: ``, category: `Relatable` });
  const [error, setError] = useState(``);
  const [pending, setPending] = useState(false);
  const editId = typeof params.edit === `string` ? params.edit : ``;
  const original = memes.find(meme => meme.id === editId && meme.source === `local`);
  useEffect(() => { if (original) setForm({ title: original.title, image: original.image, topText: original.topText, bottomText: original.bottomText, category: original.category }); }, [original?.id]);
  const submit = async () => {
    if (!form.title.trim() || !form.image.trim()) { setError(`Add a title and an image link`); return; }
    if (!form.image.startsWith(`https://`) && !form.image.startsWith(`data:image/`)) { setError(`Use a complete HTTPS image link`); return; }
    setPending(true); setError(``);
    try { const record = original ? await updateMeme(original.id, form) : await addMeme(form); router.replace({ pathname: `/meme`, params: { id: record.id } }); }
    catch (cause) { setError(cause instanceof Error ? cause.message : `Couldn't add your meme`); }
    finally { setPending(false); }
  };
  if (editId && !loading && !original) return <NativePage title={`This meme can't be edited here.`}><NativeButton title={`Back to the Archive`} href={`/discover`} /></NativePage>;
  return <NativePage title={original ? `Make it a keeper.` : `Add to the archive.`} subtitle={`Your own meme, kept on this device.`}>{([`title`, `image`, `topText`, `bottomText`] as const).map(key => <View key={key} style={{ gap: 8 }}><Text style={[styles.small, { color: palette.ink }]}>{key === `title` ? `Title` : key === `image` ? `HTTPS image URL` : key === `topText` ? `Top caption (optional)` : `Bottom caption (optional)`}</Text><TextInput nativeID={`meme-field-${key}`} accessibilityLabel={key} autoCapitalize={key === `image` ? `none` : `sentences`} value={key === `image` && form.image.startsWith(`data:`) ? `` : form[key]} placeholder={key === `image` && form.image.startsWith(`data:`) ? `Uploaded image retained` : undefined} placeholderTextColor={palette.muted} onChangeText={value => setForm(current => ({ ...current, [key]: value }))} style={[styles.field, { color: palette.ink, borderColor: palette.border, backgroundColor: palette.surface }]} /></View>)}<View style={styles.row}>{categories.map(category => <NativeButton key={category} title={category} primary={category === form.category} onPress={() => setForm(current => ({ ...current, category }))} />)}</View>{error ? <Text accessibilityRole={`alert`} style={[styles.paragraph, { color: palette.coral }]}>{error}</Text> : null}<NativeButton title={pending ? `Keeping your meme…` : original ? `✓ Save Changes` : `+ Add My Meme`} disabled={pending || loading} primary onPress={() => { void submit(); }} /><Text style={[styles.small, { color: palette.muted }]}>Linked images load from their source website. Keep copies of important images; clearing app data can remove your collection.</Text></NativePage>;
};
export default AddMemePage;
