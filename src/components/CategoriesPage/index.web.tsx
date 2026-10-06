import { Link } from 'expo-router';
import { Icon } from '../Icon';
import { RouterAnchor } from '../RouterAnchor';
import { categories } from '../LibraryPage/useLibrary';
import { useMemes } from '../../shared/memesContext/useMemes';

const descriptions = {
  Work: `Meeting sequels, inbox adventures, and a well-earned break.`,
  Gaming: `One more round. Famous last words.`,
  Animals: `Tiny paws. Big main-character energy.`,
  Wholesome: `A softer corner of the internet.`,
  Relatable: `The everyday moments that feel oddly specific.`,
  Food: `Snack breaks, coffee moods, and very relatable cravings.`,
};

const CategoriesPage = () => {
  const { memes, loading, error } = useMemes();
  return <section id={`categories-page`} className={`page-container`} aria-labelledby={`categories-title`}><div className={`page-heading`}><div><p data-reveal className={`eyebrow`}>A mood for every scroll</p><h1 data-split-text={`words`} id={`categories-title`}>Pick your kind of funny.</h1><p data-reveal>A good laugh starts with a familiar feeling.</p></div></div>{error ? <div className={`error-banner`} role={`alert`}>{error}</div> : null}<div id={`category-grid`} className={`category-grid`} data-reveal-stagger={`0.08`}>{categories.map((category, index) => <Link key={category} href={{ pathname: `/discover`, params: { category } }} asChild><RouterAnchor id={`category-card-${index}`} className={`category-card category-tone-${index}`}><span className={`category-symbol`}><Icon name={category === `Wholesome` ? `sun` : category === `Animals` ? `spark` : `grid`} /></span><h2>{category}</h2><p>{descriptions[category]}</p><span className={`category-card-bottom`}>{loading ? `Loading…` : `${memes.filter(meme => meme.category === category).length} meme${memes.filter(meme => meme.category === category).length === 1 ? `` : `s`}`}<Icon name={`right`} /></span></RouterAnchor></Link>)}</div></section>;
};

export default CategoriesPage;
