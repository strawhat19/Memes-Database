import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  page: { flex: 1 },
  heading: { gap: 13, alignItems: `center` },
  fieldGroup: { gap: 9 },
  label: { fontSize: 13, fontWeight: `700` },
  notice: { fontSize: 12, lineHeight: 20 },
  subtitle: { fontSize: 14, lineHeight: 23, textAlign: `center` },
  navigation: { gap: 9, flexDirection: `row`, justifyContent: `center` },
  card: { gap: 22, padding: 23, borderWidth: 1, borderRadius: 22 },
  field: { minHeight: 49, padding: 13, borderWidth: 1, borderRadius: 10, fontSize: 13 },
  title: { fontSize: 38, lineHeight: 42, fontWeight: `800`, textAlign: `center`, letterSpacing: -1.5 },
  eyebrow: { fontSize: 11, lineHeight: 17, fontWeight: `800`, textAlign: `center`, textTransform: `uppercase`, letterSpacing: 1.7 },
  content: { width: `100%`, maxWidth: 550, alignSelf: `center`, gap: 27, padding: 22, paddingTop: 38, paddingBottom: 42 },
});
