import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import { AddJob, AllJob, Stats, Demo } from './job/pages';
import { Routes } from './routes';
import Dashboard from './job/pages/Dashboard';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Landing from './shared/pages/Landing';
import Auth from './user/pages/Auth';
import Signup from './user/pages/AuthSignUp';
import ChangeUser from './user/pages/ChangeUser';
import ProtectedLogin from './user/pages/ProtectedLogin';
import ProtectedRoute from './user/pages/ProtectedRoute';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

ModuleRegistry.registerModules([AllCommunityModule]);



// Custom Error Component
const ErrorPage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Oops! Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <a href="/">Go Back to Home</a>
  </div>
);

// Define routes with relative paths where possible
const router = createBrowserRouter([
  {
    path: Routes.DASHBOARD,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />, // Add error handling for this route
    children: [
      { path: '', element: <Stats/> },
      { path: Routes.ADD_JOB, element: <AddJob/> },
      { path: Routes.ALL_JOB, element: <AllJob /> },
      { path: Routes.USER_PROFILE, element: <ChangeUser /> },
    ],
  },
  {
    path: Routes.LOGIN,
    element: (
      <ProtectedLogin>
        <Auth />
      </ProtectedLogin>
    ),
    errorElement: <ErrorPage />, // Add error handling for this route
  },
  {
    path: Routes.SIGNUP,
    element: (
      <ProtectedLogin>
        <Signup />
      </ProtectedLogin>
    ),
    errorElement: <ErrorPage />, // Add error handling for this route
  },
  {
    path: Routes.LANDING,
    element: <Landing />,
    errorElement: <ErrorPage />, // Add error handling for this route
  },
  {
    path: '*', // Catch-all route for undefined paths
    element: <ErrorPage />,
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
