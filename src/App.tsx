import { useCallback, useEffect, useRef, useState } from 'react';
import OpeningRitual from './components/OpeningRitual';
import { SoundControl } from './components/Soundtrack';
import { Wings } from './components/Shared';
import { useStoryMotion } from './hooks/useStoryMotion';
import Scene01Classified from './scenes/Scene01Classified';
import Scene02Journey from './scenes/Scene02Journey';
import Scene03TwoWorlds from './scenes/Scene03TwoWorlds';
import Scene04IncomingMail from './scenes/Scene04IncomingMail';
import Scene05Transformation from './scenes/Scene05Transformation';
import Scene06FearToFlight from './scenes/Scene06FearToFlight';
import Scene07Final from './scenes/Scene07Final';

const names = ['El comienzo', 'Tu camino', 'Dos mundos', 'Siempre cerca', 'Tu transformación', 'Hacia la luz', 'Lo lograste'];
export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [entering, setEntering] = useState(false);
  const [chapter, setChapter] = useState(0);
  const transitionTimer = useRef<number | undefined>(undefined);
  const introComplete = useCallback(() => setIntroDone(true), []);
  useStoryMotion(root, unlocked, setChapter);

  useEffect(() => {
    if (introDone) {
      document.querySelector<HTMLElement>('.file-result h2')?.focus({ preventScroll: true });
      return;
    }
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => { document.body.style.overflow = old; };
  }, [introDone]);
  useEffect(() => () => clearTimeout(transitionTimer.current), []);
  const goToJourney = () => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('journey')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
    history.replaceState(null, '', '#journey');
    document.querySelector<HTMLElement>('#journey h2')?.focus({ preventScroll: true });
  };
  const openFile = () => {
    if (unlocked) { goToJourney(); return; }
    setEntering(true);
    transitionTimer.current = window.setTimeout(() => {
      setUnlocked(true); setEntering(false);
      transitionTimer.current = window.setTimeout(goToJourney, 80);
    }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 850);
  };
  return <div ref={root} className={`app chapter-${chapter + 1} ${introDone ? 'intro-complete' : ''}`}>
    <div className="film-grain" aria-hidden="true"/>
    {!introDone && <OpeningRitual onComplete={introComplete}/>}
    <div inert={!introDone}>
      <SoundControl />
      <header className="site-header"><a href="#classified" className="wordmark" aria-label="Regreso a casa, volver al comienzo"><Wings/><span>OPERACIÓN<b>REGRESO A CASA</b></span></a><span className="header-note">Hecho para ti.</span></header>
      <main><Scene01Classified onOpen={openFile} unlocked={unlocked} entering={entering}/>
        {unlocked && <><Scene02Journey/><Scene03TwoWorlds/><Scene04IncomingMail/><Scene05Transformation/><Scene06FearToFlight/><Scene07Final/></>}
      </main>
      {unlocked && <><div className="chapter-indicator" aria-hidden="true"><span>0{chapter + 1}</span><i/><span>07</span><small>{names[chapter]}</small></div><div className="reading-progress" aria-hidden="true"><div/></div></>}
    </div>
  </div>;
}

