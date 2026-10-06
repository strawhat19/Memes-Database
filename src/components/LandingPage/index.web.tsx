import { Link } from 'expo-router';
import { Icon } from '../Icon';
import { RouterAnchor } from '../RouterAnchor';
import HeroBackdrop from '../HeroBackdrop';
import MemeCarousel from '../MemeCarousel';
import LandingSections from '../LandingSections';
import { memeCategories } from '../../types/types';
import { useMemes } from '../../shared/memesContext/useMemes';

const LandingPage = () => {
  const { memes, loading, error, refresh } = useMemes();
  const featured = memes.slice(0, 8);
  const rays = `M35 5 43 23M8 25 30 35M9 64 31 51`;
  return (
    <>
      <section id={`landing-hero`} className={`landing-hero`} data-hero aria-labelledby={`landing-headline`}>
        <HeroBackdrop />
        <div id={`hero-copy`} className={`hero-copy`}>
          <div id={`hero-headline-wrap`} className={`hero-headline-wrap`}>
            <svg id={`hero-heading-rays-left`} className={`hero-painted-rays hero-heading-rays hero-heading-rays-left`} viewBox={`0 0 60 75`} aria-hidden={`true`}><path d={rays} /></svg>
            <h1 id={`landing-headline`} className={`hero-headline`} data-split-text={`chars`}>A little scroll. <span>A lot of laughs.</span></h1>
            <svg id={`hero-heading-rays-right`} className={`hero-painted-rays hero-heading-rays hero-heading-rays-right`} viewBox={`0 0 60 75`} aria-hidden={`true`}><path d={rays} /></svg>
          </div>
          <p id={`hero-description`} className={`hero-description`} data-reveal data-reveal-delay={`0.15`}>Your next favorite meme is one card away.</p>
          <div id={`hero-actions`} className={`hero-actions`} data-reveal data-reveal-delay={`0.3`}>
            <div id={`hero-explore-wrap`} className={`hero-explore-wrap`}>
              <svg id={`hero-cta-rays-left`} className={`hero-painted-rays hero-cta-rays hero-cta-rays-left`} viewBox={`0 0 60 75`} aria-hidden={`true`}><path d={rays} /></svg>
              <Link href={`/discover`} asChild><RouterAnchor id={`hero-explore-memes`} className={`button button-primary`}><span>Explore Memes</span><Icon name={`right`} /></RouterAnchor></Link>
              <svg id={`hero-cta-rays-right`} className={`hero-painted-rays hero-cta-rays hero-cta-rays-right`} viewBox={`0 0 60 75`} aria-hidden={`true`}><path d={rays} /></svg>
            </div>
          </div>
        </div>
        {loading ? <div id={`hero-loading`} className={`hero-loading`} aria-label={`Loading memes`}><div /><div /><div /></div> : error ? <div id={`hero-error`} className={`empty-state`} role={`alert`}><h2>Couldn't open the archive</h2><p>{error}</p><button className={`button button-secondary`} onClick={() => { void refresh().catch(() => {}); }}>Try again</button></div> : featured.length ? <MemeCarousel memes={featured} /> : <div id={`hero-empty`} className={`empty-state`}><Icon name={`image`} /><h2>Your archive starts with a meme.</h2><p>Add the first one and make a little room for a laugh.</p><Link href={`/add`} asChild><RouterAnchor className={`button button-primary`}><Icon name={`add`} />Add a Meme</RouterAnchor></Link></div>}
      </section>
      <section id={`category-introduction`} className={`category-introduction`} aria-labelledby={`category-introduction-title`}>
        <div className={`section-heading`}><div><p className={`eyebrow`}>Pick your kind of funny</p><h2 id={`category-introduction-title`} data-split-text={`words`}>A mood for every scroll.</h2></div><Link href={`/categories`} asChild><RouterAnchor id={`view-all-categories`} className={`text-link`}>All Categories<Icon name={`right`} /></RouterAnchor></Link></div>
        <div id={`home-category-links`} className={`home-category-links`} data-reveal-stagger={`0.08`}>{memeCategories.map((category, index) => <Link key={category} href={{ pathname: `/discover`, params: { category } }} asChild><RouterAnchor id={`home-category-${index}`} className={`home-category-pill`}><Icon name={category === `Animals` ? `spark` : category === `Wholesome` ? `sun` : `grid`} />{category}<Icon name={`right`} /></RouterAnchor></Link>)}</div>
      </section>
      <LandingSections />
    </>
  );
};

export default LandingPage;
