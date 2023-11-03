import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactPage } from './ReactPage';
import { GreyCat, IndexedDbCache } from '@greycat/web';
import '../../components/app-layout';
import './app-table';
import { projectlib } from '../../common/project';

// initialize GreyCat
greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('greycat.default'),
  libraries: [projectlib],
  unauthorizedHandler: () => location.assign('../login.html'),
});

// because we are in a React context, we need to manually create the WebComponent (without @greycat/web TSX)
const app = document.createElement('app-layout');
app.parent = '..';
app.current = 'table';
// add <app-layout /> to the DOM
document.body.prepend(app);

// initialize <app-table /> and set it to the `app.main` which is the main page area
// here we use actual React TSX (not @greycat/web TSX)
const root = createRoot(app.main);
root.render(
  <StrictMode>
    <ReactPage />
  </StrictMode>,
);
