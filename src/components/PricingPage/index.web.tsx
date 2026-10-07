import './styles.scss';
import { Link } from 'expo-router';
import { Icon } from '../Icon';
import PricingSection from '../PricingSection';
import { RouterAnchor } from '../RouterAnchor';

const PricingPage = () => (
  <article
    id={`pricing-page`}
    className={`page-container pricing-page`}
    aria-labelledby={`pricing-page-title`}
  >
    <Link href={`/`} asChild>
      <RouterAnchor id={`pricing-back-home`} className={`text-link pricing-back-home`}>
        <Icon name={`left`} />Back to Memes
      </RouterAnchor>
    </Link>
    <header id={`pricing-page-heading`} className={`page-heading pricing-page-heading`}>
      <div id={`pricing-page-introduction`} className={`pricing-page-introduction`}>
        <p id={`pricing-page-eyebrow`} className={`eyebrow`} data-reveal>A little more possibility</p>
        <h1 id={`pricing-page-title`} className={`pricing-page-title`} data-split-text={`words`}>Pricing</h1>
        <p id={`pricing-page-description`} className={`pricing-page-description`} data-reveal>
          Find your starting point with Free, Memer, Maker, and Master.
        </p>
      </div>
    </header>
    <PricingSection />
  </article>
);

export default PricingPage;
