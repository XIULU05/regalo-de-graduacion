import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import instrumental from '../../Música Romántica Instrumental  Música de Piano Romántico  Música Emotiva de Amor.mp3?url';
import morat from '../../Morat, Mahou - 23 (Letra).mp3?url';

type Track = 'instrumental' | 'morat';
const sources = { instrumental, morat };
type Sound = { start: (track: Track) => void; toggle: () => void; active: boolean; playing: boolean; blocked: boolean; track: Track };
const SoundContext = createContext<Sound | null>(null);
export function SoundtrackProvider({ children }: { children: ReactNode }) {
  const channels = useRef<Partial<Record<Track, HTMLAudioElement>>>({});
  const context = useRef<AudioContext | null>(null);
  const gains = useRef<Partial<Record<Track, GainNode>>>({});
  const levels = useRef<Record<Track, number>>({ instrumental: 0, morat: 0 });
  const frame = useRef(0);
  const needsGain = useRef<boolean | null>(null);
  const enabled = useRef(true);
  const current = useRef<Track>('instrumental');
  const request = useRef(0);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [track, setTrack] = useState<Track>('instrumental');
  const level = useCallback((key: Track, value: number) => {
    levels.current[key] = value;
    const gain = gains.current[key];
    if (gain) gain.gain.value = value;
    else if (channels.current[key]) channels.current[key]!.volume = value;
  }, []);
  const stopFade = useCallback(() => { ++request.current; cancelAnimationFrame(frame.current); }, []);
  const play = useCallback((next: Track) => {
    stopFade();
    const id = request.current;
    const incoming = channels.current[next];
    if (!incoming) return;
    // Prefer native media volume. Use Web Audio only on devices (notably iOS)
    // that ignore writes to it, avoiding unnecessary media-source graphs.
    if (needsGain.current === null) {
      incoming.volume = .123;
      needsGain.current = Math.abs(incoming.volume - .123) > .001;
      incoming.volume = levels.current[next];
    }
    if (needsGain.current && !context.current && window.AudioContext) {
      try {
        const ctx = new AudioContext();
        context.current = ctx;
        for (const key of ['instrumental', 'morat'] as Track[]) {
          const element = channels.current[key]!;
          const gain = ctx.createGain();
          gain.gain.value = levels.current[key];
          ctx.createMediaElementSource(element).connect(gain).connect(ctx.destination);
          element.volume = 1;
          gains.current[key] = gain;
        }
      } catch { /* Media volume remains available when Web Audio is unavailable. */ }
    }
    level(next, levels.current[next]);
    setBlocked(false);
    const ready = context.current?.resume() ?? Promise.resolve();
    // Both requests occur synchronously inside the user gesture.
    const playback = incoming.play();
    Promise.all([ready, playback]).then(() => {
      if (id !== request.current || !enabled.current) return;
      setPlaying(true);
      const other: Track = next === 'morat' ? 'instrumental' : 'morat';
      const fromIn = levels.current[next], fromOut = levels.current[other];
      const target = next === 'instrumental' ? .3 : .65;
      const began = performance.now();
      const fade = (now: number) => {
        if (id !== request.current) return;
        const progress = Math.min(1, (now - began) / 1800);
        const eased = progress * progress * (3 - 2 * progress);
        level(next, fromIn + (target - fromIn) * eased);
        level(other, fromOut * (1 - eased));
        if (progress < 1) frame.current = requestAnimationFrame(fade);
        else channels.current[other]?.pause();
      };
      frame.current = requestAnimationFrame(fade);
    }).catch(() => {
      if (id !== request.current) return;
      Object.values(channels.current).forEach(element => element.pause());
      level('instrumental', 0); level('morat', 0);
      setBlocked(true); setPlaying(false);
    });
  }, [level, stopFade]);
  const start = useCallback((next: Track) => {
    const element = channels.current[next];
    if (!element) return;
    setActive(true);
    if (!element.getAttribute('src')) {
      element.src = sources[next];
      element.loop = next === 'instrumental';
    }
    if (next === 'morat' && current.current !== next) element.currentTime = 0;
    current.current = next;
    setTrack(next);
    if (enabled.current) play(next);
  }, [play]);
  const toggle = useCallback(() => {
    if (Object.values(channels.current).some(element => !element.paused)) {
      enabled.current = false; stopFade();
      Object.values(channels.current).forEach(element => element.pause());
      level('instrumental', 0); level('morat', 0);
      setPlaying(false); setBlocked(false);
    } else { enabled.current = true; play(current.current); }
  }, [play, level, stopFade]);
  useEffect(() => () => {
    stopFade(); Object.values(channels.current).forEach(element => element.pause());
    void context.current?.close(); context.current = null; gains.current = {};
  }, [stopFade]);
  return <SoundContext.Provider value={{ start, toggle, active, playing, blocked, track }}>
    {(['instrumental', 'morat'] as Track[]).map(key => <audio key={key} data-track={key}
      ref={element => { if (element) channels.current[key] = element; }} preload="metadata"
      onEnded={() => { if (current.current === key) setPlaying(false); }}
      onError={() => { if (current.current === key) { setPlaying(false); setBlocked(true); } }} />)}
    {children}
  </SoundContext.Provider>;
}
export function useSoundtrack() {
  const sound = useContext(SoundContext);
  if (!sound) throw new Error('SoundtrackProvider is required');
  return sound;
}
export function SoundControl({ inLetter = false }: { inLetter?: boolean }) {
  const sound = useSoundtrack();
  if (!sound.active) return null;
  return <button className={`sound-control ${inLetter ? 'sound-in-letter' : ''}`} onClick={sound.toggle}
    aria-label={sound.playing ? 'Pausar música' : 'Activar música'} title={sound.playing ? 'Pausar música' : 'Activar música'} aria-pressed={sound.playing}>
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z" stroke="currentColor" strokeWidth="1.5" />{sound.playing ? <path d="M16 8q5 4 0 8m3-11q7 7 0 14" stroke="currentColor" strokeWidth="1.5" /> : <path d="m17 10 5 5m0-5-5 5" stroke="currentColor" strokeWidth="1.5" />}</svg>
    <span>{sound.blocked ? 'Activar música' : sound.playing ? 'Pausar música' : 'Música en pausa'}</span>
  </button>;
}
