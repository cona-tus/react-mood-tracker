import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// page
import App from './App';
import Home from './page/Home';
import NotFound from './page/NotFound';
import Note from './page/Note';
import NewJournal from './page/NewJournal';
import EditJournal from './page/EditJournal';

// style
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'note/:noteId',
        element: <Note />,
      },
      {
        path: 'new',
        element: <NewJournal />,
      },
      {
        path: 'edit/:journalId',
        element: <EditJournal />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
