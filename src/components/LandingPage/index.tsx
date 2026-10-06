import { ActivityIndicator, Text, View } from 'react-native';
import MemeCarousel from '../MemeCarousel';
import LandingSections from '../LandingSections';
import { NativeButton, NativePage } from '../NativePage';
import { nativeStyles as styles } from '../NativePage/styles.native';
import { useTheme } from '../../shared/themeContext/useTheme';
import { useMemes } from '../../shared/memesContext/useMemes';

const LandingPage = () => {
  const { palette } = useTheme();
  const { memes, loading, error } = useMemes();
  return <NativePage title={`A little scroll. A lot of laughs.`} subtitle={`Your next favorite meme is one card away.`}><View style={styles.row}><NativeButton title={`✦ Explore Memes`} href={`/discover`} primary /><NativeButton title={`+ Add a Meme`} href={`/add`} /></View>{loading ? <ActivityIndicator color={palette.accent} /> : error ? <Text accessibilityRole={`alert`} style={[styles.paragraph, { color: palette.coral }]}>{error}</Text> : memes.length ? <MemeCarousel memes={memes.slice(0, 8)} /> : <Text style={[styles.paragraph, { color: palette.muted }]}>Your archive starts with a meme. Add your first keeper.</Text>}<LandingSections /></NativePage>;
};
export default LandingPage;
