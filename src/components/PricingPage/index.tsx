import PricingSection from '../PricingSection';
import { NativeButton, NativePage } from '../NativePage';

const PricingPage = () => (
  <NativePage
    title={`Pricing`}
    subtitle={`Find your starting point with Free, Memer, Maker, and Master.`}
  >
    <NativeButton id={`pricing-back-home`} href={`/`} title={`← Back to Memes`} />
    <PricingSection />
  </NativePage>
);

export default PricingPage;
