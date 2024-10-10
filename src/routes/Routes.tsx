import { RouteObject, createBrowserRouter, Navigate } from 'react-router-dom';
import AuthPage from '../component/AuthPage';
import NotePage from '../component/NotePage';
import NoteDetailPage from '../component/NoteDetailPage';
import App from '../App';
import RestrictAuth from '../component/RestrictAuth';

export const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        element: < RestrictAuth />,
        children: [
          
      {
        path: 'notes',
        element: 
            <NotePage />
      },
      {
        path: 'notes/:noteId',
        element: 
            <NoteDetailPage />
      },
        ]
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: '*',
        element: <Navigate to='/auth' replace />
      }
    ],
  },
];

export const router = createBrowserRouter(routes);
