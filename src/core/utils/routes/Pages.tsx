import { Route, Routes } from 'react-router-dom';
import { tablistRoutes, pagesRoutes } from './index';

function Pages() {
  return (
      <Routes>
        {
          [ ...tablistRoutes, 
            ...pagesRoutes
          ].map(({ path, component: Component }) => {
            return <Route key={path} path={path} element={<Component />} />;
          })
        }
      </Routes>
  );
}

export default Pages;