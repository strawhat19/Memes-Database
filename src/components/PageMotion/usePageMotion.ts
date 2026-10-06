import type { gsap } from 'gsap';
import { useEffect, type RefObject } from 'react';

export type PageMotionProps = {
  pathname: string;
  scope: RefObject<HTMLElement | null>;
};

const motionTargets = `[data-reveal], [data-split-text], [data-reveal-stagger]`;
const readDelay = (value?: string) => Math.min(.4, Math.max(0, Number.parseFloat(value ?? ``) || 0));

export const usePageMotion = ({ scope, pathname }: PageMotionProps) => {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    let disposed = false;
    let media: gsap.MatchMedia | undefined;

    const initialize = async () => {
      const [{ gsap }, { SplitText }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/SplitText'),
        import('gsap/ScrollTrigger'),
      ]);
      await document.fonts?.ready;
      if (disposed || !root.isConnected) return;

      gsap.registerPlugin(SplitText, ScrollTrigger);
      media = gsap.matchMedia(root);
      media.add(`(prefers-reduced-motion: no-preference)`, context => {
        let frame = 0;
        let active = true;
        const seen = new WeakSet<HTMLElement>();
        const revealing = new Map<HTMLElement, gsap.core.Tween>();
        const refresh = () => {
          if (!active || frame) return;
          frame = window.requestAnimationFrame(() => {
            frame = 0;
            if (active && !disposed) ScrollTrigger.refresh();
          });
        };
        const reveal = (element: HTMLElement, delay = 0) => {
          if (seen.has(element)) return;
          seen.add(element);
          if (element.contains(document.activeElement)) return;

          element.classList.add(`motion-reveal-active`);
          const tween = gsap.fromTo(element, { y: 24, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: .75,
            ease: `power3.out`,
            delay: readDelay(element.dataset.revealDelay ?? element.dataset.reveal) + delay,
            clearProps: `transform,opacity`,
            scrollTrigger: { once: true, trigger: element, start: `top 92%` },
            onComplete: () => {
              revealing.delete(element);
              element.classList.remove(`motion-reveal-active`);
            },
          });
          revealing.set(element, tween);
        };
        const splitHeading = (heading: HTMLElement) => {
          if (seen.has(heading) || !heading.textContent?.trim()) return;
          seen.add(heading);
          const characters = heading.dataset.splitText === `chars`;

          SplitText.create(heading, {
            tag: `span`,
            aria: `auto`,
            deepSlice: false,
            wordsClass: `motion-word`,
            charsClass: `motion-character`,
            type: characters ? `words,chars` : `words`,
            onSplit: split => gsap.fromTo(characters ? split.chars : split.words, {
              opacity: 0,
              yPercent: characters ? 70 : 80,
              rotationX: characters ? -45 : 0,
              transformOrigin: `50% 100%`,
            }, {
              opacity: 1,
              yPercent: 0,
              rotationX: 0,
              duration: characters ? .85 : .7,
              ease: `power3.out`,
              stagger: { amount: characters ? .45 : .25 },
              scrollTrigger: { once: true, trigger: heading, start: `top 92%` },
              onComplete: () => split.revert(),
            }),
          });
        };
        const revealGroup = (group: HTMLElement) => {
          const step = readDelay(group.dataset.revealStagger);
          Array.from(group.children).forEach((child, index) => {
            if (child instanceof HTMLElement) reveal(child, Math.min(index * step, .3));
          });
        };
        const process = (branch: HTMLElement) => {
          if (!root.contains(branch) || branch.parentElement?.closest(`[data-split-text]`)) return;
          const targets = Array.from(branch.querySelectorAll<HTMLElement>(motionTargets));
          if (branch.matches(motionTargets)) targets.unshift(branch);
          targets.forEach(element => {
            if (element.hasAttribute(`data-split-text`)) splitHeading(element);
            else if (element.hasAttribute(`data-reveal`)) reveal(element);
            if (element.hasAttribute(`data-reveal-stagger`)) revealGroup(element);
          });
          const group = branch.parentElement?.closest<HTMLElement>(`[data-reveal-stagger]`);
          if (group && root.contains(group)) revealGroup(group);
        };
        const finishFocusedReveal = (event: FocusEvent) => {
          if (!(event.target instanceof Node)) return;
          revealing.forEach((tween, element) => {
            if (element.contains(event.target as Node)) tween.progress(1);
          });
        };

        process(root);
        // Watch late collection cards, without observing GSAP style writes or split wrappers.
        const observer = new MutationObserver(records => {
          if (!active || disposed) return;
          context.add(() => {
            records.forEach(record => {
              if (record.target instanceof Element && record.target.closest(`[data-split-text]`)) return;
              record.addedNodes.forEach(node => {
                if (node instanceof HTMLElement) process(node);
              });
            });
          });
          refresh();
        });
        observer.observe(root, { subtree: true, childList: true });
        root.addEventListener(`load`, refresh, true);
        root.addEventListener(`focusin`, finishFocusedReveal);
        refresh();

        return () => {
          active = false;
          observer.disconnect();
          window.cancelAnimationFrame(frame);
          root.removeEventListener(`load`, refresh, true);
          root.removeEventListener(`focusin`, finishFocusedReveal);
          revealing.forEach((_, element) => element.classList.remove(`motion-reveal-active`));
          revealing.clear();
        };
      });
    };

    void initialize().catch(cause => {
      media?.revert();
      if (!disposed) console.warn(`Page Motion Unavailable`, cause);
    });
    return () => {
      disposed = true;
      media?.revert();
    };
  }, [scope, pathname]);
};
