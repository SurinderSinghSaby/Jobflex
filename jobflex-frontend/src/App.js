import React, {Suspense} from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Auth from './user/pages/Auth'
import Dashboard from './job/pages/Dashboard'
import Landing from './shared/pages/Landing'
import {UpdateJob, AllJob, AddJob, PendingJob, AcceptedJob, RejectedJob, Stats } from './job/pages'
import ChangeUser from './user/pages/ChangeUser'
import { AuthContext } from './shared/context/auth-context'
import ProtectedRoute from './user/pages/ProtectedRoute'
import ProtectedLogin from './user/pages/ProtectedLogin'
import { useAuth } from './shared/hooks/auth-hook'

//const Stats = React.lazy(() => import('./job/pages/Stats'))
//const UpdateJob = React.lazy(() => import('./job/pages/UpdateJob'))
//const PendingJob = React.lazy(() => import('./job/pages/PendingJob'))
//const AcceptedJob = React.lazy(() => import('./job/pages/AcceptedJob'))
//const RejectedJob = React.lazy(() => import('./job/pages/RejectedJob'))
//const AllJob = React.lazy(() => import('./job/pages/AllJob'))
//const AddJob = React.lazy(() => import('./job/pages/AddJob'))

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