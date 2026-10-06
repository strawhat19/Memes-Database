import './styles.scss';
import { Link } from 'expo-router';
import { Icon } from '../Icon';
import { landingSteps } from './content';
import { RouterAnchor } from '../RouterAnchor';

const LandingSections = () => (
  <div id={`landing-sections`} className={`landing-sections`}>
    <section
      id={`landing-how-it-works`}
      className={`landing-how-it-works`}
      aria-labelledby={`landing-how-title`}
    >
      <div id={`landing-how-heading`} className={`landing-section-heading`}>
        <p id={`landing-how-eyebrow`} className={`eyebrow`}>A happy little habit</p>
        <h2 id={`landing-how-title`} data-split-text={`words`}>Scroll. Save. Smile. Repeat.</h2>
        <p id={`landing-how-description`} className={`landing-section-description`} data-reveal>
          Less hunting for that one meme. More time enjoying it.
        </p>
      </div>
      <ol id={`landing-step-list`} className={`landing-step-list`} data-reveal-stagger={`0.08`}>
        {landingSteps.map((step, index) => (
          <li
            key={step.id}
            id={`landing-step-${step.id}`}
            className={`landing-step landing-step-${step.id}`}
          >
            <div id={`landing-step-top-${step.id}`} className={`landing-step-top`}>
              <span id={`landing-step-icon-${step.id}`} className={`landing-step-icon`}>
                <Icon name={step.icon} />
              </span>
              <span
                aria-hidden={`true`}
                id={`landing-step-number-${step.id}`}
                className={`landing-step-number`}
              >
                {`0${index + 1}`}
              </span>
            </div>
            <h3 id={`landing-step-title-${step.id}`}>{step.title}</h3>
            <p id={`landing-step-description-${step.id}`}>{step.body}</p>
            <Link href={step.href} asChild>
              <RouterAnchor
                id={`landing-step-link-${step.id}`}
                className={`text-link landing-step-link`}
              >
                {step.label}<Icon name={`right`} />
              </RouterAnchor>
            </Link>
          </li>
        ))}
      </ol>
    </section>
    <section
      id={`landing-collection`}
      className={`landing-collection`}
      aria-labelledby={`landing-collection-title`}
    >
      <div id={`landing-collection-art`} className={`landing-collection-art`} data-reveal aria-hidden={`true`}>
        <span id={`landing-collection-spark-left`} className={`landing-collection-spark landing-collection-spark-left`}><Icon name={`spark`} /></span>
        <div id={`landing-collection-stack`} className={`landing-collection-stack`}>
          <div id={`landing-collection-card-back`} className={`landing-collection-card landing-collection-card-back`} />
          <div id={`landing-collection-card-middle`} className={`landing-collection-card landing-collection-card-middle`} />
          <div id={`landing-collection-card-front`} className={`landing-collection-card landing-collection-card-front`}>
            <div id={`landing-collection-card-art`} className={`landing-collection-card-art`}>
              <span id={`landing-collection-smile`} className={`landing-collection-smile`}>
                <i id={`landing-collection-eye-left`} className={`landing-collection-eye`} />
                <i id={`landing-collection-eye-right`} className={`landing-collection-eye`} />
                <b id={`landing-collection-mouth`} className={`landing-collection-mouth`} />
              </span>
              <span id={`landing-collection-card-tag`} className={`landing-collection-card-tag`}>A certified keeper</span>
            </div>
            <div id={`landing-collection-card-caption`} className={`landing-collection-card-caption`}>
              <span id={`landing-collection-card-label`} className={`landing-collection-card-label`}>For your next good laugh</span><Icon name={`bookmark`} />
            </div>
          </div>
        </div>
        <span id={`landing-collection-note`} className={`landing-collection-note`}>Keep a little joy.</span>
        <span id={`landing-collection-spark-right`} className={`landing-collection-spark landing-collection-spark-right`}><Icon name={`spark`} /></span>
      </div>
      <div id={`landing-collection-copy`} className={`landing-collection-copy`}>
        <p id={`landing-collection-eyebrow`} className={`eyebrow`}>A home for the keepers</p>
        <h2 id={`landing-collection-title`} data-split-text={`words`}>Your kind of funny.<br />Your little collection.</h2>
        <p id={`landing-collection-description`} className={`landing-section-description`} data-reveal>
          The ones that made your day deserve more than a forgotten screenshot.
          Keep your favorites together, and add the memes you already love.
        </p>
        <div id={`landing-collection-features`} className={`landing-collection-features`}>
          <div id={`landing-collection-saved-feature`} className={`landing-collection-feature`} data-reveal>
            <span id={`landing-collection-saved-icon`} className={`landing-collection-feature-icon`}><Icon name={`bookmark`} /></span>
            <div id={`landing-collection-saved-copy`} className={`landing-collection-feature-copy`}>
              <h3 id={`landing-collection-saved-title`}>Find your favorites again</h3>
              <p id={`landing-collection-saved-description`}>One bookmark puts a meme in your Saved collection.</p>
            </div>
          </div>
          <div id={`landing-collection-add-feature`} className={`landing-collection-feature`} data-reveal>
            <span id={`landing-collection-add-icon`} className={`landing-collection-feature-icon`}><Icon name={`image`} /></span>
            <div id={`landing-collection-add-copy`} className={`landing-collection-feature-copy`}>
              <h3 id={`landing-collection-add-title`}>Make space for your own</h3>
              <p id={`landing-collection-add-description`}>Upload an image and add the words that make it work.</p>
            </div>
          </div>
        </div>
        <Link href={`/saved`} asChild>
          <RouterAnchor id={`landing-collection-saved-link`} className={`text-link`}>
            <Icon name={`bookmark`} />Visit Saved Memes<Icon name={`right`} />
          </RouterAnchor>
        </Link>
      </div>
    </section>
    <section
      id={`landing-final-cta`}
      className={`landing-final-cta`}
      aria-labelledby={`landing-final-cta-title`}
    >
      <span id={`landing-final-cta-spark`} className={`landing-final-cta-spark`} aria-hidden={`true`}><Icon name={`spark`} /></span>
      <p id={`landing-final-cta-eyebrow`} className={`eyebrow`}>There is always room</p>
      <h2 id={`landing-final-cta-title`} data-split-text={`words`}>Make room for one more laugh.</h2>
      <p id={`landing-final-cta-description`} className={`landing-section-description`} data-reveal>
        Got a good one? Give it a home. Still looking? Your next favorite is waiting.
      </p>
      <div id={`landing-final-cta-actions`} className={`landing-final-cta-actions`} data-reveal>
        <Link href={`/add`} asChild>
          <RouterAnchor id={`landing-final-add-link`} className={`button button-primary`}>
            <Icon name={`add`} />Add a Meme
          </RouterAnchor>
        </Link>
        <Link href={`/discover`} asChild>
          <RouterAnchor id={`landing-final-discover-link`} className={`button button-secondary`}>
            <Icon name={`grid`} />Keep Exploring<Icon name={`right`} />
          </RouterAnchor>
        </Link>
      </div>
    </section>
  </div>
);

export default LandingSections;
