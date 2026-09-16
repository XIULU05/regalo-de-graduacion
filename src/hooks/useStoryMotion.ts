import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function useStoryMotion(root: RefObject<HTMLDivElement | null>, unlocked: boolean, onChapter: (index: number) => void) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.scene').forEach((scene, index) => {
        ScrollTrigger.create({ trigger: scene, start: 'top 50%', end: 'bottom 50%', onEnter: () => onChapter(index), onEnterBack: () => onChapter(index) });
      });
      if (!unlocked) return;
      gsap.to('.reading-progress > div', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true } });
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => gsap.from(el, {
          y: 18, opacity: .6, duration: .85, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 94%', toggleActions: 'play none none reverse' },
        }));
        gsap.utils.toArray<HTMLElement>('.chapter-bridge span').forEach(el => gsap.fromTo(el, { scaleY: .05 }, {
          scaleY: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'bottom 45%', scrub: .5 },
        }));
        gsap.fromTo('.timeline-track i', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 65%', end: 'bottom 65%', scrub: .5 } });
        gsap.utils.toArray<HTMLElement>('.timeline-item').forEach(el => {
          gsap.from(el.querySelector('.timeline-frame'), { x: -16, rotationY: 12, scale: .94, opacity: .6,
            scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 50%', scrub: .6 } });
          ScrollTrigger.create({ trigger: el, start: 'top 70%', end: 'bottom 35%', toggleClass: 'milestone-active' });
        });
        const worlds = gsap.timeline({ scrollTrigger: { trigger: '#worlds', start: 'top 60%', end: 'bottom 75%', scrub: .8 } });
        worlds.from('.world-her', { xPercent: -6, y: 16, rotationY: 7 }, 0)
          .from('.world-me', { xPercent: 6, y: 45, rotationY: -7 }, 0)
          .fromTo('.shared-horizon', { scaleX: .05, opacity: 0 }, { scaleX: 1, opacity: .85 }, .3)
          .fromTo('.worlds-center', { opacity: .2, scale: .7 }, { opacity: 1, scale: 1 }, .3);
        gsap.fromTo('.trail-line', { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.mail-stage', start: 'top 85%', end: 'bottom 70%', scrub: .7 } });
        // Keep decoded photos on a 2D layer: Z/rotateX could produce blank image
        // surfaces in Chromium while scrubbing into a partially visible card.
        gsap.utils.toArray<HTMLElement>('.mail-photo').forEach((el, i) => gsap.from(el, { y: 30 + i * 8, rotation: i % 2 ? 3 : -3, force3D: false, scrollTrigger: { trigger: '.mail-stage', start: 'top 80%', end: 'bottom 80%', scrub: .8 } }));
        const transform = gsap.timeline({ scrollTrigger: { trigger: '#transformation', start: 'top 40%', end: 'bottom 65%', scrub: .7 } });
        transform.to('.tactical-overlay', { opacity: 0, scale: 1.04, duration: .7 }, 0)
          .fromTo('.portrait-sweep', { xPercent: -130, opacity: 0 }, { xPercent: 180, opacity: .35, duration: 1 }, 0)
          .fromTo('.transform-portrait', { y: 20, clipPath: 'inset(3% 3% 0% 3%)' }, { y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, 0)
          .fromTo('.words-before', { opacity: 1, y: 0 }, { opacity: 0, y: -10, duration: .4 }, .15)
          .fromTo('.words-after', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .4 }, .45);
        const flight = gsap.timeline({ scrollTrigger: { trigger: '#flight', start: 'top top', end: 'bottom bottom', scrub: .9 } });
        flight.fromTo('.flight-backdrop', { scale: 1 }, { scale: 1.06, yPercent: -2, ease: 'none', duration: 1 }, 0)
          .fromTo('.flight-photo', { z: -35, y: 14 }, { z: 0, y: -18, stagger: .04, duration: .8 }, 0)
          .to('.flight-light', { opacity: .48, duration: .5 }, .5)
          .to('.flight-scroll', { opacity: 0, duration: .2 }, .1);
        gsap.from('.final-memory', { y: 30, scale: .95, rotation: i => i ? 4 : -4, stagger: .15, duration: 1, scrollTrigger: { trigger: '#final', start: 'top 70%', toggleActions: 'play none none reverse' } });
        const celebration = gsap.timeline({ scrollTrigger: { trigger: '#final', start: 'top 65%', toggleActions: 'play none none reverse' } });
        celebration.fromTo('.celebration-halo', { scale: .4, opacity: 0 }, { scale: 1.3, opacity: .7, duration: 1.4, ease: 'power2.out' }, 0)
          .to('.celebration-halo', { opacity: .14, duration: 1.2 }, 1)
          .fromTo('.celebration-bokeh i', { y: 25, opacity: 0 }, { y: -16, opacity: .55, duration: 1.6, stagger: .12 }, .2);
        gsap.from('.final-copy h2', { y: 15, opacity: 0, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: '.final-copy h2', start: 'top 94%', toggleActions: 'play none none reverse' } });
      });
    }, root);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { rootMargin: '150px' });
    root.current?.querySelectorAll('.scene').forEach(el => observer.observe(el));
    const visibility = () => document.documentElement.classList.toggle('page-hidden', document.hidden);
    document.addEventListener('visibilitychange', visibility);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => { observer.disconnect(); mm.revert(); ctx.revert(); document.removeEventListener('visibilitychange', visibility); window.removeEventListener('load', refresh); };
  }, [root, unlocked, onChapter]);
}

