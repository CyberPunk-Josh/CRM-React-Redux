import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminRoutes } from '../admin/routes/AdminRoutes'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { CheckingAuth } from '../ui/components/CheckingAuth'

export const AppRouter = () => {

  const { status } = useCheckAuth();

  if ( status === 'checking' ) return <CheckingAuth />

  return (
    <Routes>

      {
        (status === 'authenticated') ?
        <Route path="/*" element={<AdminRoutes />} /> :
        <Route path="/auth/*" element={<AuthRoutes />} />
      }

      {/* Navigate */}
      <Route path="/*" element={ <Navigate to='/auth/login' />}/>

      {/* lOGIN AND CREATE ACCOUNT */}
     {/*  <Route path="/auth/*" element={<AuthRoutes />} /> */}
      {/* ADMIN PANEL */}
      {/* <Route path="/*" element={<AdminRoutes />} />  */}

    </Routes>
  )
}
