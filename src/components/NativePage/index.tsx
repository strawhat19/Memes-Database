import type { ReactNode } from 'react';
import { useRouter, type Href } from 'expo-router';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { nativeStyles as styles } from './styles.native';
import type { MemeRecord } from '../../shared/models/Meme';
import { useTheme } from '../../shared/themeContext/useTheme';
import { useMemes } from '../../shared/memesContext/useMemes';

export const NativeButton = ({ title, onPress, href, disabled = false, primary = false, id }: { title: string; onPress?: () => void; href?: Href; disabled?: boolean; primary?: boolean; id?: string }) => {
  const router = useRouter();
  const { theme, palette } = useTheme();
  return <Pressable nativeID={id} accessibilityRole={`button`} disabled={disabled} accessibilityState={{ disabled }} onPress={() => href ? router.push(href) : onPress?.()} style={[styles.button, { borderColor: palette.border, backgroundColor: primary ? palette.primary : palette.surface, opacity: disabled ? .5 : 1 }]}><Text style={[styles.buttonText, { color: primary ? theme === `dark` ? `#25213D` : `#FFF5ED` : palette.ink }]}>{title}</Text></Pressable>;
};

export const NativePage = ({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) => {
  const { palette } = useTheme();
  return <ScrollView style={[styles.body, { backgroundColor: palette.paper }]} contentContainerStyle={styles.content}><Text accessibilityRole={`header`} style={[styles.headline, { color: palette.ink }]}>{title}</Text>{subtitle ? <Text style={[styles.paragraph, { color: palette.muted }]}>{subtitle}</Text> : null}{children}</ScrollView>;
};

export const NativeMemeCard = ({ meme }: { meme: MemeRecord }) => {
  const { savedIds, toggleSaved } = useMemes();
  const saved = savedIds.includes(meme.id);
  const raster = /^(https:\/\/|data:image\/(?:png|jpeg|webp|gif))/i.test(meme.image);
  return <View nativeID={`meme-card-${meme.id}`} style={styles.card}>{meme.topText ? <Text style={styles.caption}>{meme.topText}</Text> : null}{raster ? <Image accessibilityLabel={meme.title} source={{ uri: meme.image }} style={styles.image} resizeMode={`contain`} /> : <View style={styles.fallbackArt}><Text style={styles.fallbackSymbol}>✦</Text></View>}{meme.bottomText ? <Text style={styles.caption}>{meme.bottomText}</Text> : null}<View style={[styles.row, { justifyContent: `space-between`, padding: 5 }]}><View><Text style={styles.category}>{meme.category}</Text><Text style={styles.cardTitle}>{meme.title}</Text></View><NativeButton id={`save-meme-${meme.id}`} title={saved ? `✓ Saved` : `♡ Save`} onPress={() => { void toggleSaved(meme.id).catch(cause => Alert.alert(`Couldn't Save`, cause instanceof Error ? cause.message : `Please try again`)); }} /></View><NativeButton id={`view-meme-${meme.id}`} title={`View Meme →`} href={{ pathname: `/meme`, params: { id: meme.id } }} /></View>;
};
