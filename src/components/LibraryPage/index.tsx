import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Alert, Text, TextInput, View } from 'react-native';
import { categories, useLibrary } from './useLibrary';
import { NativeButton, NativeMemeCard, NativePage } from '../NativePage';
import { nativeStyles as styles } from '../NativePage/styles.native';
import { useTheme } from '../../shared/themeContext/useTheme';
import { useMemes } from '../../shared/memesContext/useMemes';

const LibraryPage = ({ savedOnly = false }: { savedOnly?: boolean }) => {
  const { palette } = useTheme();
  const params = useLocalSearchParams<{ category?: string }>();
  const { memes, savedIds, loading, error, clearSaved } = useMemes();
  const library = useLibrary(memes, savedIds, savedOnly);
  useEffect(() => { if (typeof params.category === `string` && categories.includes(params.category as typeof categories[number])) library.setCategory(params.category); }, [params.category]);
  return <NativePage title={savedOnly ? `The keepers.` : `The meme archive.`} subtitle={savedOnly ? `Your favorites, saved privately on this device.` : `Find a favorite and keep it close.`}><TextInput nativeID={`meme-search`} accessibilityLabel={`Search memes`} placeholder={`Search memes…`} placeholderTextColor={palette.muted} value={library.query} onChangeText={library.setQuery} style={[styles.field, { color: palette.ink, backgroundColor: palette.surface, borderColor: palette.border }]} /><View style={styles.row}>{[`All`, ...categories].map(category => <NativeButton key={category} id={`category-${category}`} title={category} primary={category === library.category} onPress={() => library.setCategory(category)} />)}</View><View style={styles.row}><NativeButton title={`Newest`} primary={library.sort === `newest`} onPress={() => library.setSort(`newest`)} /><NativeButton title={`Oldest`} primary={library.sort === `oldest`} onPress={() => library.setSort(`oldest`)} /><NativeButton title={`A–Z`} primary={library.sort === `title`} onPress={() => library.setSort(`title`)} /><NativeButton title={library.source === `local` ? `My Memes ✓` : `My Memes`} onPress={() => library.setSource(library.source === `local` ? `all` : `local`)} /></View><Text style={[styles.small, { color: palette.muted }]}>{library.filtered.length} meme(s)</Text>{error ? <Text accessibilityRole={`alert`} style={[styles.paragraph, { color: palette.coral }]}>{error}</Text> : null}{loading ? <ActivityIndicator color={palette.accent} /> : library.filtered.length ? library.filtered.map(meme => <NativeMemeCard key={meme.id} meme={meme} />) : <Text style={[styles.paragraph, { color: palette.muted }]}>{savedOnly ? `Save a favorite from Discover to see it here.` : `No memes match. Try another filter or add one of your own.`}</Text>}<NativeButton title={`+ Add a Meme`} href={`/add`} primary />{savedOnly && savedIds.length ? <NativeButton title={`Clear Saved`} onPress={() => Alert.alert(`Clear Saved?`, `The memes stay in your archive; this removes their bookmarks.`, [{ text: `Keep them`, style: `cancel` }, { text: `Clear Saved`, style: `destructive`, onPress: () => { void clearSaved().catch(cause => Alert.alert(`Couldn't Clear Saved`, cause instanceof Error ? cause.message : `Please try again`)); } }])} /> : null}</NativePage>;
};
export default LibraryPage;
