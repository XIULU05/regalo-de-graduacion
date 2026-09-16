import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { content } from '../data/content';
import { InsigniaPart, Particles } from './Shared';
import { useSoundtrack } from './Soundtrack';
export default function OpeningRitual({ onComplete }: { onComplete: () => void }) {
  const [pieces, setPieces] = useState<number[]>([]);
  const [leaving, setLeaving] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  const sound = useSoundtrack();
  const complete = pieces.length === 3;
  useLayoutEffect(() => {
    // Do not steal focus if the visitor already reached one of the controls.
    const active = document.activeElement;
    if (!active || !document.querySelector('.opening-ritual')?.contains(active)) {
      title.current?.focus({ preventScroll: true });
    }
  }, []);
  useEffect(() => {
    if (!complete && !leaving) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(onComplete, reduced ? 150 : leaving ? 500 : 1700);
    return () => clearTimeout(timer);
  }, [complete, leaving, onComplete]);
  return <div className={`opening-ritual ${complete ? 'is-assembled' : ''} ${leaving ? 'is-leaving' : ''}`} role="dialog" aria-modal="true" aria-labelledby="ritual-title"
    onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('button');
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === title.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }}>
    <Particles warm /><span className="ritual-edition">Una misión. Toda una vida por delante.</span>
    <div className="ritual-content"><span className="eyebrow">{content.intro.eyebrow}</span><h1 id="ritual-title" ref={title} tabIndex={-1}>{content.intro.title}</h1>
      <p className="recipient-name">Para mi Emperatriz, la mujer más trabajadora que conozco.</p>
      <div className="fragment-space">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        {[0, 1, 2].map(i => <button key={i} className={`wing-piece wing-piece-${i} ${pieces.includes(i) ? 'is-joined' : ''}`}
          aria-label={`Unir pieza ${i + 1}`} aria-pressed={pieces.includes(i)} onClick={() => {
            if (pieces.includes(i)) return;
            if (pieces.length === 2) sound.start('instrumental');
            setPieces(old => [...old, i]);
          }}>
          <svg className="insignia-piece" viewBox={i === 0 ? '0 0 170 220' : i === 1 ? '170 0 170 220' : '90 215 160 100'} fill={`url(#piece-gold-${i})`} aria-hidden="true">
            <defs><linearGradient id={`piece-gold-${i}`} x1="0" y1="0" x2=".8" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0" stopColor="#fff3cf"/><stop offset=".2" stopColor="#c9a05e"/><stop offset=".43" stopColor="#f6e3b5"/><stop offset=".48" stopColor="#fff9df"/><stop offset=".52" stopColor="#ae7d3e"/><stop offset=".8" stopColor="#ddbd80"/><stop offset="1" stopColor="#9b6b35"/>
            </linearGradient><filter id={`piece-bevel-${i}`} x="-15%" y="-15%" width="130%" height="140%"><feGaussianBlur in="SourceAlpha" stdDeviation="1" result="soft"/><feSpecularLighting in="soft" surfaceScale="2" specularConstant=".65" specularExponent="22" lightingColor="#fff4d6" result="shine"><feDistantLight azimuth="230" elevation="45"/></feSpecularLighting><feComposite in="shine" in2="SourceAlpha" operator="in" result="edge"/><feBlend in="SourceGraphic" in2="edge" mode="screen"/></filter></defs>
            <g filter={`url(#piece-bevel-${i})`}><InsigniaPart part={i}/></g></svg><span className="piece-number">0{i + 1}</span>
        </button>)}
        <div className="ritual-wave" />
      </div>
      <p className="ritual-instruction" role="status">{complete ? content.intro.ready : content.intro.hint}</p>
      <div className="ritual-progress" aria-hidden="true">{[0, 1, 2].map(i => <i key={i} className={pieces.includes(i) ? 'done' : ''} />)}</div>
    </div>
    <button className="text-button ritual-skip" onClick={() => { sound.start('instrumental'); setLeaving(true); }}>{content.intro.skip}<span>→</span></button>
  </div>;
}


