import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  center: { textAlign: `center` },
  sections: { gap: 35, marginTop: 22 },
  section: { gap: 15 },
  card: { gap: 13, padding: 22, borderWidth: 1, borderRadius: 22 },
  cta: { gap: 18, padding: 25, borderWidth: 1, borderRadius: 25 },
  eyebrow: { fontSize: 10, fontWeight: `800`, letterSpacing: 1.7, textTransform: `uppercase` },
  title: { fontSize: 29, fontWeight: `800`, lineHeight: 34, letterSpacing: -.8 },
  description: { fontSize: 14, lineHeight: 23 },
  cardTitle: { fontSize: 19, lineHeight: 24, fontWeight: `700`, letterSpacing: -.4 },
});
