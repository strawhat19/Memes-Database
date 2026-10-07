import { Text, View } from 'react-native';
import { landingSteps } from './content';
import { NativeButton } from '../NativePage';
import { styles } from './styles.native';
import PricingSection from '../PricingSection';
import { useTheme } from '../../shared/themeContext/useTheme';

const LandingSections = () => {
  const { palette } = useTheme();
  return (
    <View nativeID={`landing-sections`} style={styles.sections}>
      <View nativeID={`landing-how-it-works`} style={styles.section}>
        <Text nativeID={`landing-how-eyebrow`} style={[styles.eyebrow, { color: palette.accent }]}>A happy little habit</Text>
        <Text nativeID={`landing-how-title`} accessibilityRole={`header`} style={[styles.title, { color: palette.ink }]}>Scroll. Save. Smile. Repeat.</Text>
        <Text nativeID={`landing-how-description`} style={[styles.description, { color: palette.muted }]}>Less hunting for that one meme. More time enjoying it.</Text>
        {landingSteps.map((step, index) => (
          <View
            key={step.id}
            nativeID={`landing-step-${step.id}`}
            style={[styles.card, { borderColor: palette.border, backgroundColor: palette.surface }]}
          >
            <Text nativeID={`landing-step-number-${step.id}`} style={[styles.eyebrow, { color: palette.accent }]}>{`0${index + 1}`}</Text>
            <Text nativeID={`landing-step-title-${step.id}`} accessibilityRole={`header`} style={[styles.cardTitle, { color: palette.ink }]}>{step.title}</Text>
            <Text nativeID={`landing-step-description-${step.id}`} style={[styles.description, { color: palette.muted }]}>{step.body}</Text>
            <NativeButton id={`landing-step-link-${step.id}`} href={step.href} title={`${step.label} →`} />
          </View>
        ))}
      </View>
      <View nativeID={`landing-collection`} style={styles.section}>
        <Text nativeID={`landing-collection-eyebrow`} style={[styles.eyebrow, { color: palette.accent }]}>A home for the keepers</Text>
        <Text nativeID={`landing-collection-title`} accessibilityRole={`header`} style={[styles.title, { color: palette.ink }]}>Your kind of funny. Your little collection.</Text>
        <Text nativeID={`landing-collection-description`} style={[styles.description, { color: palette.muted }]}>Keep your favorites together, and add the memes you already love.</Text>
        <View nativeID={`landing-collection-features`} style={[styles.card, { borderColor: palette.border, backgroundColor: palette.surface }]}>
          <Text nativeID={`landing-collection-saved-title`} style={[styles.cardTitle, { color: palette.ink }]}>♡ Find your favorites again</Text>
          <Text nativeID={`landing-collection-saved-description`} style={[styles.description, { color: palette.muted }]}>One bookmark puts a meme in your Saved collection.</Text>
          <Text nativeID={`landing-collection-add-title`} style={[styles.cardTitle, { color: palette.ink }]}>+ Make space for your own</Text>
          <Text nativeID={`landing-collection-add-description`} style={[styles.description, { color: palette.muted }]}>Upload an image and add the words that make it work.</Text>
          <NativeButton id={`landing-collection-saved-link`} href={`/saved`} title={`♡ Visit Saved Memes`} />
        </View>
      </View>
      <PricingSection />
      <View nativeID={`landing-final-cta`} style={[styles.cta, { borderColor: palette.border, backgroundColor: palette.surface }]}>
        <Text nativeID={`landing-final-cta-eyebrow`} style={[styles.eyebrow, { color: palette.accent }]}>✦ There is always room</Text>
        <Text nativeID={`landing-final-cta-title`} accessibilityRole={`header`} style={[styles.title, styles.center, { color: palette.ink }]}>Make room for one more laugh.</Text>
        <Text nativeID={`landing-final-cta-description`} style={[styles.description, styles.center, { color: palette.muted }]}>Got a good one? Give it a home. Still looking? Your next favorite is waiting.</Text>
        <NativeButton primary href={`/add`} title={`+ Add a Meme`} id={`landing-final-add-link`} />
        <NativeButton href={`/discover`} title={`Keep Exploring →`} id={`landing-final-discover-link`} />
      </View>
    </View>
  );
};

export default LandingSections;
