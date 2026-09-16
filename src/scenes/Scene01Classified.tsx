import { content } from '../data/content';
import { Photo } from '../components/Photo';
import { Arrow, Wings } from '../components/Shared';
type Props = { onOpen: () => void; unlocked: boolean; entering: boolean };
export default function Scene01Classified({ onOpen, unlocked, entering }: Props) {
  return <section className={`scene scene-classified ${entering ? 'is-entering' : ''}`} id="classified" aria-label="Tu expediente">
    <div className="opening-copy"><span className="eyebrow">Para la mujer que se atrevió</span>
      <h1>OPERACIÓN:<span>REGRESO A CASA</span></h1><p className="opening-tagline">{content.subtitle}</p>
      <p className="opening-note">Distintos lugares.<br/>El mismo amor.</p>
    </div>
    <div className="dossier">
      <div className="dossier-top"><span>Expediente personal <b>{content.recipient || 'Una historia de valentía'}</b></span><Wings /></div>
      <div className="scan-layout">
        <div className="scan-photo"><Photo src={content.opening.image} label="Tu retrato, el comienzo de nuestra historia" eager/><div className="scan-line"/><i className="corner tl"/><i className="corner br"/></div>
        <div className="scan-data"><span className="scan-index">01</span><span className="scan-label">IDENTIDAD<br/>CONFIRMADA</span><span className="scan-rule"/><span>Valor.<br/>Disciplina.<br/>Corazón.</span></div>
      </div>
      <div className="file-result"><span className="eyebrow">Mucho más que un nombre</span><h2 tabIndex={-1}>{content.opening.title}</h2><p><span className="status-dot"/>{content.opening.status}</p></div>
      <button className="button button-outline" onClick={onOpen} disabled={entering}>{unlocked ? 'Volver al camino' : content.opening.button}<Arrow/></button>
      <p className="dossier-bottom">Este expediente guarda algo que solo tú podías lograr.</p>
    </div>
    <div className="opening-sweep" aria-hidden="true"/>
    <p className="opening-footnote"><span/>Tu historia merece ser contada.<span/></p>
  </section>;
}

