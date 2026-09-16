import { content } from '../data/content';
import { Photo } from '../components/Photo';
import { ChapterBridge, SceneHeading, SceneFooter } from '../components/Shared';
export default function Scene05Transformation() {
  return <section className="scene scene-transformation" id="transformation"><div className="scene-inner">
    <SceneHeading number="05" title={content.transformation.title}/><p className="transform-intro" data-reveal>{content.transformation.intro}</p>
    <div className="transform-stage"><Photo className="transform-portrait" src={content.transformation.image} label="Tu retrato: la mujer detrás del uniforme" natural/>
      <div className="portrait-sweep" aria-hidden="true"/>
      <div className="tactical-overlay" aria-hidden="true"><i/><span>La persona detrás de la misión</span><i/></div>
    </div>
    <div className="transform-words" aria-label="Del miedo a la valentía"><div className="words-before" aria-hidden="true">{content.transformation.before.map(word => <span key={word}>{word}</span>)}</div><div className="words-after">{content.transformation.after.map(word => <span key={word}>{word}</span>)}</div></div>
    <SceneFooter>{content.transformation.footer}</SceneFooter>
  </div><ChapterBridge/></section>;
}

