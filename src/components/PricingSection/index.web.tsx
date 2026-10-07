import './styles.scss';
import { Link } from 'expo-router';
import { Icon } from '../Icon';
import { RouterAnchor } from '../RouterAnchor';
import { pricingNote, pricingPlans, getPlanPrice } from './content';

const PricingSection = () => (
  <section
    id={`landing-pricing`}
    className={`landing-pricing`}
    aria-labelledby={`landing-pricing-title`}
  >
    <div id={`landing-pricing-heading`} className={`pricing-section-heading`}>
      <p id={`landing-pricing-eyebrow`} className={`eyebrow`}>Plans & possibilities</p>
      <h2 id={`landing-pricing-title`} className={`pricing-section-title`} data-split-text={`words`}>A plan for every kind of funny.</h2>
      <p id={`landing-pricing-description`} className={`pricing-section-description`} data-reveal>
        Start with a little laugh. Make room for your next big idea.
      </p>
    </div>
    <div id={`landing-pricing-table`} className={`pricing-table`} data-reveal-stagger={`0.08`}>
      {pricingPlans.map((plan, index) => {
        const price = getPlanPrice(plan);

        return (
          <article
            key={plan.id}
            id={`pricing-plan-${plan.id}`}
            aria-labelledby={`pricing-plan-name-${plan.id}`}
            className={`pricing-plan pricing-plan-${plan.tone}${plan.featured ? ` pricing-plan-featured` : ``}`}
          >
            {plan.featured ? (
              <span id={`pricing-plan-badge-${plan.id}`} className={`pricing-plan-badge`}>
                <Icon name={`spark`} />A little more creative
              </span>
            ) : null}
            <p id={`pricing-plan-audience-${plan.id}`} className={`pricing-plan-audience`}>{plan.audience}</p>
            <div id={`pricing-plan-heading-${plan.id}`} className={`pricing-plan-heading`}>
              <span id={`pricing-plan-icon-${plan.id}`} className={`pricing-plan-icon`}><Icon name={plan.icon} /></span>
              <h3 id={`pricing-plan-name-${plan.id}`} className={`pricing-plan-name`}>{plan.name}</h3>
            </div>
            <p id={`pricing-plan-description-${plan.id}`} className={`pricing-plan-description`}>{plan.description}</p>
            <div id={`pricing-plan-pricing-${plan.id}`} className={`pricing-plan-pricing`}>
              <div id={`pricing-plan-price-row-${plan.id}`} className={`pricing-plan-price-row`}>
                <span id={`pricing-plan-price-${plan.id}`} className={`pricing-plan-price`}>{price.value}</span>
                {price.period ? <span id={`pricing-plan-period-${plan.id}`} className={`pricing-plan-period`}>{price.period}</span> : null}
              </div>
              <p id={`pricing-plan-price-detail-${plan.id}`} className={`pricing-plan-price-detail`}>{price.detail}</p>
            </div>
            <ul id={`pricing-plan-features-${plan.id}`} className={`pricing-plan-features`}>
              {plan.features.map((feature, featureIndex) => (
                <li id={`pricing-plan-feature-${plan.id}-${featureIndex}`} key={feature} className={`pricing-plan-feature`}>
                  <Icon name={`check`} /><span id={`pricing-plan-feature-label-${plan.id}-${featureIndex}`} className={`pricing-plan-feature-label`}>{feature}</span>
                </li>
              ))}
            </ul>
            <div id={`pricing-plan-footer-${plan.id}`} className={`pricing-plan-footer`}>
              <span id={`pricing-plan-number-${plan.id}`} className={`pricing-plan-number`} aria-hidden={`true`}>{`0${index + 1} / 04`}</span>
              <Link href={plan.href} asChild>
                <RouterAnchor
                  id={`pricing-plan-action-${plan.id}`}
                  className={`text-link pricing-plan-action`}
                  aria-label={`${plan.label} — ${plan.name} plan`}
                >
                  {plan.label}<Icon name={`right`} />
                </RouterAnchor>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
    <p id={`landing-pricing-note`} className={`pricing-section-note`}><Icon name={`info`} />{pricingNote}</p>
  </section>
);

export default PricingSection;
