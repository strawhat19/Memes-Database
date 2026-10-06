import { Text, View } from 'react-native';
import { categories } from '../LibraryPage/useLibrary';
import { NativeButton, NativePage } from '../NativePage';
import { nativeStyles as styles } from '../NativePage/styles.native';
import { useTheme } from '../../shared/themeContext/useTheme';
import { useMemes } from '../../shared/memesContext/useMemes';

const CategoriesPage = () => {
  const { palette } = useTheme();
  const { memes, error } = useMemes();
  return <NativePage title={`Pick your kind of funny.`} subtitle={`A mood for every scroll.`}>{error ? <Text accessibilityRole={`alert`} style={[styles.paragraph, { color: palette.coral }]}>{error}</Text> : null}{categories.map(category => <View key={category} nativeID={`category-${category}`} style={{ gap: 10 }}><Text style={[styles.heading, { color: palette.ink }]}>{category}</Text><Text style={[styles.small, { color: palette.muted }]}>{memes.filter(meme => meme.category === category).length} meme(s)</Text><NativeButton title={`Explore ${category} →`} href={{ pathname: `/discover`, params: { category } }} /></View>)}</NativePage>;
};
export default CategoriesPage;
