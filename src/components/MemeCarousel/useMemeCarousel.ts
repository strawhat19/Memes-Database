import { useRef, useState, useEffect } from 'react';
import type { CSSProperties, MouseEvent, PointerEvent } from 'react';
import type { MemeRecord } from '../../shared/models/Meme';

type DragSession = {
  x: number;
  y: number;
  time: number;
  lastX: number;
  offset: number;
  pointer: number;
  velocity: number;
  dragging: boolean;
};

type CardStyle = CSSProperties & Record<`--card-${string}`, string | number>;

const useMemeCarousel = (memes: MemeRecord[]) => {
  const drag = useRef<DragSession | null>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const suppressClick = useRef(false);
  const [index, setIndex] = useState(Math.min(1, Math.max(0, memes.length - 1)));
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [holding, setHolding] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [cardWidth, setCardWidth] = useState(285);
  const [dragOffset, setDragOffset] = useState(0);
  const [announcement, setAnnouncement] = useState(``);
  const activeIndex = Math.min(index, Math.max(0, memes.length - 1));
  const pageWidth = cardWidth * .85;

  useEffect(() => {
    const preference = window.matchMedia(`(prefers-reduced-motion: reduce)`);
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener(`change`, update);
    return () => preference.removeEventListener(`change`, update);
  }, []);

  useEffect(() => {
    const element = viewport.current;
    const card = element?.querySelector<HTMLElement>(`.carousel-card-slot`);
    if (!element || !card) return;
    const measure = () => setCardWidth(card.offsetWidth);
    const observer = new ResizeObserver(measure);
    measure();
    observer.observe(card);
    observer.observe(element);
    return () => observer.disconnect();
  }, [memes.length]);

  useEffect(() => {
    if (focused || hovered || holding || reduced || memes.length < 2) return;
    const interval = window.setInterval(() => {
      if (!document.hidden) setIndex(current => (current + 1) % memes.length);
    }, 4800);
    return () => window.clearInterval(interval);
  }, [focused, hovered, holding, reduced, memes.length]);

  const show = (cardIndex: number) => {
    if (!memes.length) return;
    const next = (cardIndex % memes.length + memes.length) % memes.length;
    setIndex(next);
    setAnnouncement(`${memes[next]?.title}, ${next + 1} of ${memes.length}`);
  };

  const move = (direction: number) => show(activeIndex + direction);

  const getCardPosition = (cardIndex: number) => {
    let offset = cardIndex - activeIndex;
    if (offset > memes.length / 2) offset -= memes.length;
    if (offset < -memes.length / 2) offset += memes.length;
    const position = offset + dragOffset / pageWidth;
    const distance = Math.abs(position);
    const hidden = distance > 2.5;
    const style: CardStyle = {
      '--card-offset': position,
      '--card-opacity': hidden ? 0 : Math.max(0, 1 - distance * .06),
      '--card-order': 10 - Math.round(distance * 2),
      '--card-depth': `${-Math.min(distance, 3) * 160}px`,
      '--card-tilt': `${Math.max(-2, Math.min(2, position)) * 2}deg`,
      '--card-turn': `${-Math.max(-1, Math.min(1, position)) * 32}deg`,
    };
    return { style, hidden };
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || drag.current) return;
    suppressClick.current = false;
    if (memes.length < 2 || (event.target as Element).closest(`button`)) return;
    drag.current = {
      offset: 0,
      velocity: 0,
      dragging: false,
      x: event.clientX,
      y: event.clientY,
      time: event.timeStamp,
      lastX: event.clientX,
      pointer: event.pointerId,
    };
    setHolding(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const session = drag.current;
    if (!session || session.pointer !== event.pointerId) return;
    const offset = event.clientX - session.x;
    const vertical = event.clientY - session.y;
    if (!session.dragging) {
      if (Math.abs(vertical) > 8 && Math.abs(vertical) > Math.abs(offset)) {
        drag.current = null;
        setHolding(false);
        return;
      }
      if (Math.abs(offset) < 8) return;
      session.dragging = true;
      suppressClick.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.closest<HTMLElement>(`.hero-carousel`)?.focus({ preventScroll: true });
      setDragging(true);
    }
    session.velocity = (event.clientX - session.lastX) / Math.max(1, event.timeStamp - session.time);
    session.time = event.timeStamp;
    session.lastX = event.clientX;
    session.offset = Math.max(-pageWidth * 1.2, Math.min(pageWidth * 1.2, offset));
    setDragOffset(session.offset);
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>, cancelled = false) => {
    const session = drag.current;
    if (!session || session.pointer !== event.pointerId) return;
    drag.current = null;
    setHolding(false);
    setDragging(false);
    setDragOffset(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!session.dragging || cancelled) return;
    const velocity = event.timeStamp - session.time < 120 ? session.velocity : 0;
    if (Math.abs(session.offset) > pageWidth * .18 || (Math.abs(session.offset) > 14 && Math.abs(velocity) > .5)) {
      move(session.offset < 0 ? 1 : -1);
    }
  };

  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current || event.detail === 0) return;
    suppressClick.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  return {
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
  };
};

export default useMemeCarousel;
