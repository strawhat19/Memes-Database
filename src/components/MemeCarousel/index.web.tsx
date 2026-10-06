import { Icon } from '../Icon';
import MemeCard from '../MemeCard';
import useMemeCarousel from './useMemeCarousel';
import type { MemeRecord } from '../../shared/models/Meme';

const MemeCarousel = ({ memes }: { memes: MemeRecord[] }) => {
  const {
    move,
    show,
    reduced,
    dragging,
    viewport,
    finishDrag,
    activeIndex,
    setFocused,
    setHovered,
    announcement,
    onPointerDown,
    onPointerMove,
    onClickCapture,
    getCardPosition,
  } = useMemeCarousel(memes);

  return (
    <section
      data-reveal
      tabIndex={0}
      id={`hero-meme-carousel`}
      aria-label={`Featured memes`}
      aria-roledescription={`carousel`}
      onFocus={() => setFocused(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`hero-carousel ${reduced ? `is-reduced-motion` : ``}`}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={event => {
        if (event.key !== `ArrowLeft` && event.key !== `ArrowRight`) return;
        event.preventDefault();
        move(event.key === `ArrowRight` ? 1 : -1);
        event.currentTarget.focus();
      }}
    >
      <svg id={`hero-fresh-laughs`} className={`hero-fresh-laughs`} viewBox={`0 0 190 125`} aria-hidden={`true`}><text x={`11`} y={`41`} transform={`rotate(-12 11 41)`}>Fresh laughs</text><path d={`M72 51C57 72 67 94 110 103M95 105l18-1-7-16`} /></svg>
      <div
        ref={viewport}
        id={`hero-carousel-window`}
        onPointerUp={event => finishDrag(event)}
        onClickCapture={onClickCapture}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onDragStart={event => event.preventDefault()}
        onPointerLeave={event => { if (!dragging) finishDrag(event, true); }}
        onPointerCancel={event => finishDrag(event, true)}
        onLostPointerCapture={event => { if (event.target === event.currentTarget) finishDrag(event, true); }}
        className={`hero-carousel-window ${dragging ? `is-dragging` : ``}`}
      >
        <div id={`hero-carousel-track`} className={`hero-carousel-track`}>
          {memes.map((meme, cardIndex) => {
            const { style, hidden } = getCardPosition(cardIndex);
            return (
              <div
                role={`group`}
                key={meme.id}
                style={style}
                className={`carousel-card-slot`}
                aria-roledescription={`slide`}
                id={`hero-card-slot-${meme.id}`}
                aria-hidden={activeIndex !== cardIndex}
                data-hidden={hidden ? `true` : undefined}
                aria-label={`${meme.title}, ${cardIndex + 1} of ${memes.length}`}
                onClickCapture={event => {
                  if (activeIndex === cardIndex) return;
                  event.preventDefault();
                  event.stopPropagation();
                  show(cardIndex);
                }}
              >
                <MemeCard
                  carousel
                  meme={meme}
                  active={activeIndex === cardIndex}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div id={`hero-carousel-controls`} className={`hero-carousel-controls`}>
        <button id={`hero-carousel-previous`} className={`icon-button carousel-arrow carousel-arrow-previous`} aria-label={`Previous meme`} disabled={memes.length < 2} onClick={() => move(-1)}><Icon name={`left`} /></button>
        <div id={`hero-carousel-dots`} className={`carousel-dots`} aria-label={`Choose featured meme`}>{memes.map((meme, cardIndex) => <button id={`hero-dot-${meme.id}`} className={`carousel-dot`} key={meme.id} aria-label={`Show ${meme.title}`} aria-current={activeIndex === cardIndex ? true : undefined} onClick={() => show(cardIndex)} />)}</div>
        <button id={`hero-carousel-next`} className={`icon-button carousel-arrow carousel-arrow-next`} aria-label={`Next meme`} disabled={memes.length < 2} onClick={() => move(1)}><Icon name={`right`} /></button>
      </div>
      <p id={`hero-carousel-announcement`} className={`visually-hidden`} aria-live={`polite`}>{announcement}</p>
    </section>
  );
};

export default MemeCarousel;
