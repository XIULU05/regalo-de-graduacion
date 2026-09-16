import { content } from '../data/content';
import { Photo } from '../components/Photo';
import { ChapterBridge, SceneHeading, SceneFooter } from '../components/Shared';
export default function Scene02Journey() {
  return <section className="scene scene-journey" id="journey"><div className="scene-inner">
    <SceneHeading number="02" title={content.journey.title} subtitle={content.journey.subtitle}/>
    <div className="timeline"><div className="timeline-track" aria-hidden="true"><i/></div>
      {content.journey.weeks.map((week, i) => <article className="timeline-item" key={week.label}>
        <span className="timeline-node" aria-hidden="true"/><figure className="timeline-frame"><Photo src={week.image} label={`Tu retrato de ${week.label.toLowerCase()}`}/><span className="milestone-shine"/></figure>
        <div className="milestone-copy"><span className="week-label">{week.label}</span><h3>{week.title}</h3><p>{week.text}</p></div>
        <span className="timeline-count" aria-hidden="true">0{i + 1}</span>
      </article>)}
    </div><SceneFooter>{content.journey.footer}</SceneFooter>
  </div><ChapterBridge split/></section>;
}

