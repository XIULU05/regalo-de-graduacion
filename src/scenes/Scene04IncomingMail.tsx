import { useState } from 'react';
import { content } from '../data/content';
import { Photo } from '../components/Photo';
import { ChapterBridge, Particles, SceneHeading, SceneFooter, Wings } from '../components/Shared';
import { useDialog } from '../hooks/useDialog';
export default function Scene04IncomingMail() {
  const [selected, setSelected] = useState(0);
  const letter = useDialog();
  const note = content.mail.notes[selected];
  return <section className="scene scene-mail" id="mail"><div className="scene-inner">
    <SceneHeading number="04" title={content.mail.title} subtitle={content.mail.subtitle}/>
    <p className="mail-intro" data-reveal>{content.mail.text}</p>
    <div className={`mail-stage ${letter.open ? 'is-reading' : ''}`}><Particles warm/>
      <svg className="light-trail" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden="true">
        <path className="trail-glow" d="M85 15C450 50 400 170 185 255S18 438 275 570"/>
        <path className="trail-line" pathLength="1" d="M85 15C450 50 400 170 185 255S18 438 275 570"/>
        <path className="trail-spark" pathLength="1" d="M85 15C450 50 400 170 185 255S18 438 275 570"/>
      </svg>
      <span className="mail-direction mail-from">De mi mundo<span>al tuyo.</span></span>
      {content.mail.notes.map((item, i) => <button className={`envelope envelope-${i + 1} ${letter.open && selected === i ? 'is-open' : ''}`} key={item.title}
        onClick={event => { setSelected(i); letter.show(event.currentTarget); }} aria-label={`Abrir sobre ${i + 1}`} aria-haspopup="dialog">
        <span className="envelope-visual"><span className="envelope-paper"/><span className="envelope-flap"/><span className="envelope-fold"/><span className="envelope-seal">0{i + 1}</span></span>
      </button>)}
      {content.mail.memories.map((memory, i) => <figure className={`polaroid mail-photo mail-photo-${i + 1}`} key={memory.image}>
        <Photo src={memory.image} label={`Nuestra foto enviada con una carta, recuerdo ${i + 1}`} natural/><figcaption>{memory.note}</figcaption>
      </figure>)}
    </div>
    <p className="touch-hint"><span/>Toca un sobre. Hay algo para ti.</p>
    <SceneFooter>{content.mail.footer}</SceneFooter>
  </div><ChapterBridge/>
  <dialog ref={letter.ref} className={`envelope-dialog ${letter.closing ? 'is-closing' : ''}`} aria-labelledby="envelope-title"
    onCancel={e => { e.preventDefault(); letter.close(); }} onClose={letter.onClose} onClick={e => { if(e.target === letter.ref.current) letter.close(); }}>
    <div className="paper-message"><button className="close-button" aria-label="Cerrar sobre" onClick={letter.close}>×</button>
      <Wings/><span className="eyebrow">De mí, para ti · 0{selected + 1}</span><h3 id="envelope-title">{note.title}</h3><p>{note.text}</p><span className="paper-signature">{note.signature}</span>
    </div>
  </dialog></section>;
}

