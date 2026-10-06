import { useRouter } from 'expo-router';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { NativeButton, NativeMemeCard, NativePage } from '../NativePage';
import { nativeStyles as styles } from '../NativePage/styles.native';
import { useTheme } from '../../shared/themeContext/useTheme';
import { useMemes } from '../../shared/memesContext/useMemes';

const MemeDetailPage = ({ id }: { id: string }) => {
  const router = useRouter();
  const { palette } = useTheme();
  const { memes, loading, error, removeMeme } = useMemes();
  const meme = memes.find(item => item.id === id);
  const remove = async () => { try { await removeMeme(id); router.replace(`/discover`); } catch (cause) { Alert.alert(`Couldn't Delete`, cause instanceof Error ? cause.message : `Please try again`); } };
  if (loading) return <NativePage title={`Opening your meme…`}><ActivityIndicator color={palette.accent} /></NativePage>;
  if (!meme) return <NativePage title={`This meme isn't here.`} subtitle={error || `It may have been removed or belong to another device.`}><NativeButton title={`Back to the Archive`} href={`/discover`} /></NativePage>;
  return <NativePage title={meme.title} subtitle={meme.category}><NativeMemeCard meme={meme} />{meme.source === `local` ? <View style={styles.row}><NativeButton title={`Edit Meme`} href={{ pathname: `/add`, params: { edit: meme.id } }} /><NativeButton title={`Delete Meme`} onPress={() => Alert.alert(`Remove this meme?`, `This removes your meme and bookmark from this device.`, [{ text: `Keep it`, style: `cancel` }, { text: `Delete`, style: `destructive`, onPress: () => { void remove(); } }])} /></View> : <Text style={[styles.paragraph, { color: palette.muted }]}>An original starter-collection illustration. Save it if it feels a little too relatable.</Text>}</NativePage>;
};
export default MemeDetailPage;
