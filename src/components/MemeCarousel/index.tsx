import { useState } from 'react';
import { View } from 'react-native';
import { NativeButton, NativeMemeCard } from '../NativePage';
import type { MemeRecord } from '../../shared/models/Meme';
import { nativeStyles as styles } from '../NativePage/styles.native';

const MemeCarousel = ({ memes }: { memes: MemeRecord[] }) => {
  const [index, setIndex] = useState(0);
  const active = memes[index] || memes[0];
  if (!active) return null;
  return <View style={{ gap: 15 }}><NativeMemeCard meme={active} /><View style={[styles.row, { justifyContent: `center` }]}><NativeButton title={`← Previous`} disabled={memes.length < 2} onPress={() => setIndex((index - 1 + memes.length) % memes.length)} /><NativeButton title={`Next →`} disabled={memes.length < 2} onPress={() => setIndex((index + 1) % memes.length)} /></View></View>;
};
export default MemeCarousel;
