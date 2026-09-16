import type { ReactNode } from 'react';
export function SceneHeading({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return <header className="scene-heading" data-reveal>
    <span className="eyebrow"><i /> Capítulo {number} <i /></span>
    <h2 tabIndex={-1}>{title}</h2>{subtitle && <p className="heading-subtitle">{subtitle}</p>}
  </header>;
}
export function SceneFooter({ children }: { children: ReactNode }) { return <p className="scene-footer" data-reveal>{children}</p>; }
export function Arrow() { return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.25" /></svg>; }
export function Particles({ warm = false }: { warm?: boolean }) {
  return <div className={`particles ${warm ? 'particles--warm' : ''}`} aria-hidden="true">{Array.from({ length: 12 }, (_, i) =>
    <i key={i} style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 23 + 7) % 100}%`, animationDelay: `${-i * 1.3}s`, animationDuration: `${9 + i % 5}s` }} />)}</div>;
}
export function ChapterBridge({ split = false }: { split?: boolean }) {
  return <div className={`chapter-bridge ${split ? 'bridge-split' : ''}`} aria-hidden="true"><span /><i /></div>;
}
// Vector geometry based on the insignia reference supplied for this gift.
export function InsigniaPart({ part }: { part: number }) {
  if (part === 2) return <><circle cx="170" cy="235" r="18"/><path d="m123 229 20 16-12 32-40-31Zm94 0 32 17-40 31-12-32ZM170 263l34 26-34 24-34-24Z"/></>;
  return <g transform={part === 1 ? 'translate(340 0) scale(-1 1)' : undefined}>
    <path d="M23 0 4 42l64 43ZM0 51l30 60 129 92 7-32ZM36 128l28 60 40 29h50Z"/>
  </g>;
}
export function Wings({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 340 315" fill="currentColor" aria-hidden="true">{[0, 1, 2].map(part => <InsigniaPart part={part} key={part}/>)}</svg>;
}

