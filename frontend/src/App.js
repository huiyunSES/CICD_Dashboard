import * as React from 'react';
import { useRoutes } from 'react-router-dom'
import Dashboard from './pages/executive_summary/index'
import SignIn from './pages/login/SignIn'
import Admin from './pages/admin/index';
import MainLayout from './layouts/sidebar';
import NotFoundPage from './pages/NotFoundPage'
import Developer from './pages/developer';
import Lead from './pages/project_lead';

export default function App() {
  let element = useRoutes([
    {
      path: '/dashboard',
      element: <MainLayout />,
      children: [
        {
          path: 'summary',
          element: <Dashboard />
        },
        {
          path: 'developer',
          element: <Developer />
        },
        {
          path: 'lead',
          element: <Lead />
        },
        {
          path: 'admin',
          element: <Admin />
        }
      ]
    },
    {
      path: '/',
      element: <SignIn />
    },
    {
      path: "*",
      element: <NotFoundPage />
    }
  ])

  return <div>{element}</div>
}
