import { content } from '../data/content';
import { Photo } from '../components/Photo';
import { Arrow, Particles, SceneFooter, Wings } from '../components/Shared';
import { useDialog } from '../hooks/useDialog';
import { SoundControl, useSoundtrack } from '../components/Soundtrack';

export default function Scene07Final() {
  const letter = useDialog();
  const sound = useSoundtrack();

  return (
    <section
      className={`scene scene-final ${letter.open ? 'is-reading' : ''}`}
      id="final"
    >
      <Particles warm />

      <div className="final-light" aria-hidden="true" />

      <div className="celebration-halo" aria-hidden="true" />

      <div className="celebration-bokeh" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <i key={i} />
        ))}
      </div>

      <div className="final-layout">
        <div className="final-art">
          <Photo
            className="final-portrait"
            src={content.final.main}
            label="Tu retrato de celebración, rodeada de luz dorada"
          />

          <figure className="polaroid final-memory final-memory-1">
            <Photo
              src={content.final.couple[0]}
              label="Nosotros junto al mar"
              natural
            />
            <figcaption>Nos quedan tantos días.</figcaption>
          </figure>

          <figure className="polaroid final-memory final-memory-2">
            <Photo
              src={content.final.couple[1]}
              label="Un recuerdo nuestro, muy cerca"
              natural
            />
            <figcaption>Y tantas historias.</figcaption>
          </figure>
        </div>

        <div className="final-copy" data-reveal>
          <span className="eyebrow">Capítulo 07 · Todo un futuro</span>

          <h2>{content.final.title}</h2>

          <p className="final-greeting">{content.final.greeting}</p>

          <p className="final-message">{content.final.text}</p>

          <button
            className="button button-gold"
            onClick={(event) => {
              sound.start('morat');
              letter.show(event.currentTarget);
            }}
            aria-haspopup="dialog"
          >
            {content.final.button}
            <Arrow />
          </button>

          <SceneFooter>{content.final.footer}</SceneFooter>
        </div>
      </div>

      <p className="end-quote">{content.message.note}</p>

      <a className="replay text-button" href="#classified">
        Volver al comienzo <span>↑</span>
      </a>

      <dialog
        ref={letter.ref}
        className={`letter-space ${letter.closing ? 'is-closing' : ''}`}
        aria-labelledby="message-title"
        onCancel={(e) => {
          e.preventDefault();
          letter.close();
        }}
        onClose={() => {
          letter.onClose();
          sound.start('instrumental');
        }}
      >
        <SoundControl inLetter />

        <div className="letter-envelope" aria-hidden="true">
          <i className="letter-envelope-sheet" />
          <i className="letter-envelope-pocket" />
          <i className="letter-envelope-flap" />
        </div>

        <button
          className="close-button letter-close"
          aria-label="Cerrar mensaje"
          onClick={letter.close}
        >
          ×
        </button>

        <div className="message-letter">
          <Wings />

          <span className="eyebrow">{content.message.eyebrow}</span>

          <h2 id="message-title">{content.message.title}</h2>

          {content.message.paragraphs.map((p) => (
            <p
              className={
                p.startsWith('Mi novia hermosa, qué lejos has llegado')
                  ? 'letter-emphasis'
                  : ''
              }
              key={p}
            >
              {p}
            </p>
          ))}

          <p className="signature">{content.message.signature}</p>

          <div className="letter-rule" />

          <button
            className="text-button letter-return"
            onClick={letter.close}
          >
            Volver a este momento <span>↗</span>
          </button>
        </div>
      </dialog>
    </section>
  );
}