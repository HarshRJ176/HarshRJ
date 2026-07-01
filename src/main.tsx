import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

import './styles/variables.css';
import './styles/typography.css';
import './styles/global.css';
import './styles/engine.css';
import './styles/world.css';
import './styles/layout.css';
import './styles/ui.css';
import './styles/animations.css';
import './styles/utilities.css';
import './styles/responsive.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element (#root) not found — check index.html.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
