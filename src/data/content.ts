import { photo } from './assets';
export { photo, photoFraming } from './assets';
export const content = {
  recipient: 'Vayholine Casilla',
  title: 'OPERACIÓN: REGRESO A CASA',
  subtitle: 'Hay misiones que lo cambian todo.',
  intro: { eyebrow: 'Una historia hecha para ti', title: 'Todo empieza\ncon un poco de valor.', hint: 'Toca las tres piezas. Este viaje es tuyo.', ready: 'Lista para tu próximo capítulo.', skip: 'Entrar directamente' },
  opening: { title: 'Hay una historia detrás\nde este uniforme.', status: 'BMT completado', button: 'Abrir expediente', image: photo('scene1-main') },
  journey: {
    title: 'El camino que recorriste', subtitle: 'Un día a la vez. Hasta llegar aquí.',
    // Emotional copy, not assertions about specific personal training events.
    // Official context: docs/BMT-SOURCES.md.
    weeks: [
      { label: 'Semana 1', title: 'El comienzo', text: 'Todo era nuevo. Había miedo.\nY aun así, diste el primer paso.', image: photo('scene2-week1') },
      { label: 'Semana 3', title: 'Tu fuerza crecía', text: 'Seguiste incluso con cansancio.\nQué orgullo me da esa forma tuya de no rendirte.', image: photo('scene2-week3') },
      { label: 'Semana 5', title: 'Un poco más lejos', text: 'Mi vida, cada esfuerzo contó.\nOjalá pudieras verte con la admiración con que te miro.', image: photo('scene2-week5') },
      { label: 'Graduación', title: 'Mira hasta dónde llegaste', text: 'Ese miedo no decidió por ti.\nHoy tienes tantas razones para sentirte orgullosa.', image: photo('scene2-graduation') },
    ], footer: 'Desde lejos, nunca dejé de creer en ti.',
  },
  worlds: {
    title: 'Dos mundos.\nUn mismo cielo.', subtitle: 'Lejos en el mapa. Cerca en todo lo demás.',
    her: { title: 'Tú, allá', lines: ['Madrugar. Aprender. Seguir.'], image: photo('scene3-her'), footer: 'Construyendo tu próximo capítulo.' },
    me: { title: 'Yo, aquí', lines: ['Escribirte. Esperarte. Pensarte.'], image: photo('scene3-me'), footer: 'Contando los días para volver a verte.' },
    text: 'Vivimos días completamente distintos. Pero no hubo uno en el que dejaras de estar presente en el mío.',
    footer: 'La distancia cambió nuestras rutinas.\nNo lo que siento por ti.',
  },
  mail: {
    title: 'Siempre encontré\ncómo llegar a ti.', subtitle: 'Un poco de casa, en cada sobre.',
    text: 'Aunque no pudiéramos hablar como antes, seguí buscando formas de acompañarte.',
    footer: 'La distancia nunca tuvo la última palabra.',
    memories: [
      { image: photo('scene4-letter01'), note: 'Qué bien se está contigo.' },
      { image: photo('scene4-letter02'), note: 'Tanto por vivir.' },
      { image: photo('scene4-letter03'), note: 'De esos días que abrazo.' },
    ],
    notes: [
      { title: 'Te tenía presente.', text: 'Mi cielo, entre una carta y la siguiente también pensaba en ti. Me gustaba imaginar que estas palabras podían hacerte compañía un ratito.', signature: 'Un abrazo, hasta encontrarnos.' },
      { title: 'Un día menos.', text: 'Cada foto llevaba algo nuestro: una risa, un paseo, las ganas de repetirlo. Guárdame un espacio para todos los recuerdos que nos faltan.', signature: 'Tengo tantas ganas de verte.' },
      { title: 'De este lado, yo.', text: 'No podía acortar tus días, hermosa. Pero sí recordarte que aquí tenías a alguien pendiente de ti, deseando saber cómo estabas y celebrando cada paso.', signature: 'Aquí tienes tu lugar.' },
    ],
  },
  transformation: {
    title: 'Misión completada', intro: 'Nunca se trató solo del uniforme.',
    image: photo('scene5-main'), before: ['Miedo', 'Presión', 'Distancia', 'Cansancio'], after: ['Disciplina', 'Resistencia', 'Valentía', 'Fuerza'],
    footer: 'Se trataba de ti.\nDe todo lo que ya llevabas dentro.',
  },
  flight: {
    title: 'Del miedo al vuelo', lines: ['Tuviste miedo.', 'Fuiste de todos modos.', 'Y ahora mírate.'],
    main: photo('scene6-memory00'), images: Array.from({ length: 5 }, (_, i) => photo(`scene6-memory0${i + 1}`)),
    footer: 'Eso que parecía imposible\nya es parte de lo que superaste.', ending: 'Y esto apenas comienza.',
  },
  final: {
    title: 'Lo lograste.', greeting: 'Qué orgullo, mi vida.',
    text: 'Hoy quiero celebrarte a ti: tu esfuerzo, tu corazón y todo lo que te atreviste a superar. Qué suerte la mía de compartir contigo lo que viene.',
    main: photo('scene7-main'), couple: [photo('scene7-couple01'), photo('scene7-couple02')],
    button: 'Abre mi mensaje', footer: 'El mismo amor. Todo un futuro por delante.',
  },
  message: {
    eyebrow: 'Para ti, mi persona favorita', title: 'Bienvenida a tu\npróximo capítulo.',
    paragraphs: [
      'Sé que estas semanas te exigieron muchísimo. Hubo miedo, cansancio, presión y días en los que quizá solo querías que todo terminara.',
      'Desde aquí no podía cargar ese peso por ti. No podía estar a tu lado al empezar cada mañana. Pero nunca dejé de pensar en ti, de esperar saber de ti y de creer en todo lo que eras capaz de hacer.',
'Honestamente, espero que esta pequeña muestra de afecto de mi parte pueda sentirse como parte de tu regalo de graduación. Tal vez sea algo humilde, pero de verdad me esforcé para hacerte llegar, de la mejor manera que pude, un enorme “felicidades”.',

'Superaste todas esas pruebas que parecían tan complicadas, pero que al final nunca fueron imposibles para ti. Lo hiciste excelente, y sé que voy a alucinar cuando me cuentes todo lo que viviste, todo lo que te pusieron a hacer y cada una de esas historias que todavía no conozco.',

'Gracias a Dios, este proceso que para mí también se sintió larguísimo finalmente terminó. Sé que todavía quedan otras etapas por delante, pero al menos esta parte tan intensa ya quedó atrás. Lo demás prefiero decírtelo cuando podamos hablar tranquilos. Y como siempre te decía: te mando un abrazo virtual enorme. Nada, mi amor, te amo muchísimo.',
      'Mi novia hermosa, qué lejos has llegado, sinceramente ahora tengo muchas mas cosas de las cuales presumir de ti jejeje.',
      'Y sin importar qué venga después, quiero seguir aquí para celebrar contigo cada nueva versión de ti.',
    ], signature: 'Te amo mucho mi querida emperatriz. ♡', note: 'Hay misiones que no terminan.\nTe traen de vuelta a casa.',
  },
};

