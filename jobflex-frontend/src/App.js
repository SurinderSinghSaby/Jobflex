import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AcceptedJob, AddJob, AllJob, PendingJob, RejectedJob, Stats, UpdateJob } from './job/pages'
import Dashboard from './job/pages/Dashboard'
import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hook'
import Landing from './shared/pages/Landing'
import Auth from './user/pages/Auth'
import ChangeUser from './user/pages/ChangeUser'
import ProtectedLogin from './user/pages/ProtectedLogin'
import ProtectedRoute from './user/pages/ProtectedRoute'

const router = createBrowserRouter([
  {path: '/dashboard', element:
  <ProtectedRoute>
    <Dashboard/>
  </ProtectedRoute>,
    children: [
      {path: '/dashboard/:userId/', element: <Stats/>},
      {path: '/dashboard/:userId/addjob', element: <AddJob/>},
      {path: '/dashboard/updatejob/:jobid', element: <UpdateJob/>},
      {path: '/dashboard/:userId/pendingjob', element: <PendingJob/>},
      {path: '/dashboard/:userId/acceptedjob', element: <AcceptedJob/>},
      {path: '/dashboard/:userId/rejectedjob', element: <RejectedJob/>},
      {path: '/dashboard/:userId/alljob', element: <AllJob/>},
      {path: '/dashboard/:userId/userprofile', element: <ChangeUser/>},
  ]},
  {path: '/login', element:
  <ProtectedLogin>
    <Auth/>
  </ProtectedLogin>
   
  },
  {path: '/', element: <Landing/>}

])

const App = () => {
 
  const {token, login, logout, userId} = useAuth()
  return( 
  <AuthContext.Provider value={{login, logout, token: token, isLoggedIn : !!token, userId}}>
   
      <RouterProvider router={router} />
  
    
  </AuthContext.Provider>
 
  )
}

export default App