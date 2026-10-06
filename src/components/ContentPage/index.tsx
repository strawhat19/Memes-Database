import { Text, View } from 'react-native';
import { NativeButton, NativePage } from '../NativePage';
import { contentPages, type ContentPageName } from './content';
import { nativeStyles as styles } from '../NativePage/styles.native';
import { useTheme } from '../../shared/themeContext/useTheme';

const ContentPage = ({ page }: { page: ContentPageName }) => {
  const { palette } = useTheme();
  const content = contentPages[page];
  return <NativePage title={content.title} subtitle={content.introduction}>{content.sections.map((section, index) => <View key={section.title} nativeID={`content-${page}-${index}`} style={{ gap: 10 }}><Text accessibilityRole={`header`} style={[styles.heading, { color: palette.ink }]}>{section.title}</Text><Text style={[styles.paragraph, { color: palette.muted }]}>{section.body}</Text></View>)}<NativeButton title={page === `contact` ? `Visit Piratechs ↗` : `Explore Memes →`} href={page === `contact` ? `https://piratechs.com/` : `/discover`} primary /></NativePage>;
};
export default ContentPage;
