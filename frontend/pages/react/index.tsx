import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../components/app-layout';
import { ReactPage } from './ReactPage';

const app = document.createElement('app-layout');
app.parent = '..';
app.current = 'react';

await app.init();

document.body.prepend(app);

const root = createRoot(app.main);
root.render(
  <StrictMode>
    <ReactPage />
  </StrictMode>
);
