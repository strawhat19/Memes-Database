import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../src/shared/themeContext/useTheme';

const NotFoundRoute = () => {
  const { palette } = useTheme();
  return (
    <View nativeID='not-found-page' style={styles.page}>
      <Text style={[styles.title, { color: palette.ink }]}>This meme wandered off.</Text>
      <Text style={[styles.copy, { color: palette.muted }]}>Let’s find something worth a laugh.</Text>
      <Link href='/' style={[styles.link, { color: palette.accent }]}>Return Home →</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  link: { fontSize: 17, marginTop: 22 },
  copy: { fontSize: 17, marginTop: 12 },
  title: { fontSize: 34, fontWeight: `800` },
  page: { gap: 8, padding: 48, minHeight: 420, justifyContent: `center`, alignItems: `center` },
});

export default NotFoundRoute;
