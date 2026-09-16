import { content } from '../data/content';
import { Photo } from '../components/Photo';
import { ChapterBridge, SceneHeading, SceneFooter } from '../components/Shared';
export default function Scene03TwoWorlds() {
  return <section className="scene scene-worlds" id="worlds"><div className="scene-inner">
    <SceneHeading number="03" title={content.worlds.title} subtitle={content.worlds.subtitle}/>
    <div className="worlds-split">
      {[content.worlds.her, content.worlds.me].map((world, i) => <div className={`world world-${i === 0 ? 'her' : 'me'}`} key={world.title}>
        <div className="world-copy"><h3>{world.title}</h3><p>{world.lines[0]}</p></div>
        <div className="world-image"><Photo src={world.image} label={i === 0 ? 'Tu mundo: entrenamiento, amaneceres y esfuerzo' : 'Mi mundo: cartas, espera y pensar en ti'} natural/></div>
        <p className="world-footer">{world.footer}</p>
      </div>)}
      <div className="shared-horizon" aria-hidden="true"/><span className="worlds-center" aria-hidden="true">∞</span>
    </div>
    <p className="worlds-story" data-reveal>{content.worlds.text}</p>
    <SceneFooter>{content.worlds.footer}</SceneFooter>
  </div><ChapterBridge/></section>;
}

