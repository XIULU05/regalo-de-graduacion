import { content } from '../data/content';
import { Photo } from '../components/Photo';
import { SceneHeading, Particles } from '../components/Shared';
export default function Scene06FearToFlight() {
  return <section className="scene scene-flight" id="flight"><div className="flight-inner">
    <div className="flight-backdrop"><Photo src={content.flight.main} label="De espaldas al amanecer, mirando hacia el horizonte de la pista"/></div>
    <div className="flight-shade" aria-hidden="true"/>
    <div className="flight-heading"><SceneHeading number="06" title={content.flight.title}/><div className="flight-lines">{content.flight.lines.map(line => <p key={line}>{line}</p>)}</div></div>
    <div className="flight-stage"><div className="flight-memories">{content.flight.images.map((src, i) => <figure className={`flight-photo flight-photo-${i + 1}`} key={src}><Photo src={src} label={`Nuestro recuerdo de la escena del vuelo, ${i + 1}`} natural/></figure>)}</div></div>
    <div className="flight-caption"><p>{content.flight.footer}</p><span>{content.flight.ending}</span></div>
    <div className="flight-light" aria-hidden="true"/><Particles warm/>
    <span className="flight-scroll" aria-hidden="true">Sigue hacia la luz <i>↓</i></span>
  </div></section>;
}

