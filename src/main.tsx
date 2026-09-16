import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/barlow-condensed/latin-400.css';
import '@fontsource/barlow-condensed/latin-500.css';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import App from './App';
import { SoundtrackProvider } from './components/Soundtrack';
import './styles.css';
import './responsive.css';
import './warm.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><SoundtrackProvider><App /></SoundtrackProvider></React.StrictMode>);

