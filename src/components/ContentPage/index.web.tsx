import { Link } from 'expo-router';
import { Icon } from '../Icon';
import { RouterAnchor } from '../RouterAnchor';
import { contentPages, type ContentPageName } from './content';

const ContentPage = ({ page }: { page: ContentPageName }) => {
  const content = contentPages[page];
  return <article id={`content-page-${page}`} className={`page-container content-page`} aria-labelledby={`content-title-${page}`}><header className={`page-heading`}><div><p data-reveal className={`eyebrow`}>{content.eyebrow}</p><h1 key={page} data-split-text={`words`} id={`content-title-${page}`}>{content.title}</h1><p data-reveal>{content.introduction}</p></div></header><div className={`content-sections`} data-reveal-stagger={`0.1`}>{content.sections.map((section, index) => <section id={`content-section-${page}-${index}`} key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}</div>{page === `contact` ? <a id={`contact-piratechs-link`} className={`button button-primary`} href={`https://piratechs.com/`}>Visit Piratechs<Icon name={`external`} /></a> : <Link href={`/discover`} asChild><RouterAnchor id={`content-explore-${page}`} className={`button button-primary`}><Icon name={`spark`} />Explore Memes<Icon name={`right`} /></RouterAnchor></Link>}</article>;
};

export default ContentPage;
