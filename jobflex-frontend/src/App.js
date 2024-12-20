import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AcceptedJob, AddJob, AllJob, PendingJob, RejectedJob, Stats, UpdateJob } from './job/pages';
import Dashboard from './job/pages/Dashboard';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Landing from './shared/pages/Landing';
import Auth from './user/pages/Auth';
import Signup from './user/pages/AuthSignUp';
import ChangeUser from './user/pages/ChangeUser';
import ProtectedLogin from './user/pages/ProtectedLogin';
import ProtectedRoute from './user/pages/ProtectedRoute';

// Define routes with relative paths where possible
const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Stats /> }, // Default route for dashboard
      { path: 'addjob', element: <AddJob /> },
      { path: 'updatejob/:jobId', element: <UpdateJob /> },
      { path: 'pendingjob', element: <PendingJob /> },
      { path: 'acceptedjob', element: <AcceptedJob /> },
      { path: 'rejectedjob', element: <RejectedJob /> },
      { path: 'alljob', element: <AllJob /> },
      { path: 'userprofile', element: <ChangeUser /> },
    ],
  },
  {
    path: '/login',
    element: (
      <ProtectedLogin>
        <Auth />
      </ProtectedLogin>
    ),
  },
  {
    path: '/signup',
    element: (
      <ProtectedLogin>
        <Signup />
      </ProtectedLogin>
    ),
  },
  {
    path: '/',
    element: <Landing />,
  },
]);

const App = () => {
  const { token, login, logout, userId } = useAuth();
  return (
    <AuthContext.Provider value={{ login, logout, token, isLoggedIn: !!token, userId }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
