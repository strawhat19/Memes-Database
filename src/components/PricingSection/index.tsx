import { Icon } from '../Icon';
import { Text, View } from 'react-native';
import { styles } from './styles.native';
import { NativeButton } from '../NativePage';
import { useTheme } from '../../shared/themeContext/useTheme';
import { getPlanPrice, pricingNote, pricingPlans } from './content';

const PricingSection = () => {
  const { theme, palette } = useTheme();
  const iconColor = theme === `dark` ? palette.paper : palette.ink;

  return (
    <View nativeID={`landing-pricing`} style={styles.section}>
      <View nativeID={`landing-pricing-header`} style={styles.header}>
        <Text nativeID={`landing-pricing-eyebrow`} style={[styles.eyebrow, { color: palette.accent }]}>
          {`✦ Plans & possibilities`}
        </Text>
        <Text nativeID={`landing-pricing-title`} accessibilityRole={`header`} style={[styles.title, { color: palette.ink }]}>
          {`A plan for every kind of funny.`}
        </Text>
        <Text nativeID={`landing-pricing-description`} style={[styles.description, { color: palette.muted }]}>
          {`Start with a little laugh. Make room for your next big idea.`}
        </Text>
      </View>
      <View nativeID={`landing-pricing-table`} style={styles.table}>
        {pricingPlans.map((plan, planIndex) => {
          const price = getPlanPrice(plan);
          const planColor = palette[plan.tone];

          return (
            <View
              key={plan.id}
              nativeID={`pricing-plan-${plan.id}`}
              style={[
                styles.card,
                {
                  borderTopColor: planColor,
                  backgroundColor: palette.surface,
                  borderColor: plan.featured ? palette.accent : palette.border,
                },
              ]}
            >
              {plan.featured && (
                <Text
                  nativeID={`pricing-plan-badge-${plan.id}`}
                  style={[styles.badge, { color: iconColor, backgroundColor: planColor }]}
                >
                  {`A little more creative`}
                </Text>
              )}
              <Text nativeID={`pricing-plan-audience-${plan.id}`} style={[styles.eyebrow, { color: palette.muted }]}>
                {plan.audience}
              </Text>
              <View nativeID={`pricing-plan-heading-${plan.id}`} style={styles.planHeading}>
                <Text
                  nativeID={`pricing-plan-icon-${plan.id}`}
                  style={[styles.icon, { color: iconColor, backgroundColor: planColor }]}
                >
                  <Icon name={plan.icon} />
                </Text>
                <Text nativeID={`pricing-plan-name-${plan.id}`} accessibilityRole={`header`} style={[styles.planName, { color: palette.ink }]}>
                  {plan.name}
                </Text>
              </View>
              <Text nativeID={`pricing-plan-description-${plan.id}`} style={[styles.description, { color: palette.muted }]}>
                {plan.description}
              </Text>
              <View nativeID={`pricing-plan-pricing-${plan.id}`} style={styles.pricing}>
                <View nativeID={`pricing-plan-price-row-${plan.id}`} style={styles.priceRow}>
                  <Text nativeID={`pricing-plan-price-${plan.id}`} style={[styles.price, { color: palette.ink }]}>
                    {price.value}
                  </Text>
                  <Text nativeID={`pricing-plan-period-${plan.id}`} style={[styles.detail, { color: palette.muted }]}>
                    {price.period}
                  </Text>
                </View>
                <Text nativeID={`pricing-plan-detail-${plan.id}`} style={[styles.detail, { color: palette.muted }]}>
                  {price.detail}
                </Text>
              </View>
              <View nativeID={`pricing-plan-features-${plan.id}`} style={[styles.features, { borderColor: palette.border }]}>
                {plan.features.map((feature, featureIndex) => (
                  <View key={feature} nativeID={`pricing-plan-feature-${plan.id}-${featureIndex}`} style={styles.feature}>
                    <Text nativeID={`pricing-plan-feature-icon-${plan.id}-${featureIndex}`} style={[styles.featureIcon, { color: palette.accent }]}>
                      <Icon name={`check`} />
                    </Text>
                    <Text nativeID={`pricing-plan-feature-label-${plan.id}-${featureIndex}`} style={[styles.featureLabel, { color: palette.ink }]}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
              <View nativeID={`pricing-plan-footer-${plan.id}`} style={styles.footer}>
                <Text nativeID={`pricing-plan-number-${plan.id}`} style={[styles.number, { color: palette.muted }]}>
                  {`${String(planIndex + 1).padStart(2, `0`)} / 04`}
                </Text>
                <NativeButton
                  href={plan.href}
                  primary={plan.featured}
                  title={`${plan.label} →`}
                  id={`pricing-plan-action-${plan.id}`}
                />
              </View>
            </View>
          );
        })}
      </View>
      <View nativeID={`landing-pricing-note`} style={styles.note}>
        <Text nativeID={`landing-pricing-note-icon`} style={[styles.noteIcon, { color: palette.accent }]}>
          <Icon name={`info`} />
        </Text>
        <Text nativeID={`landing-pricing-note-label`} style={[styles.noteLabel, { color: palette.muted }]}>
          {pricingNote}
        </Text>
      </View>
    </View>
  );
};

export default PricingSection;
