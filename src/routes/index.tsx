import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { ForgotPassword } from '../pages/ForgotPassword'
import { Profile } from '../pages/Profile'
import { ResetPassword } from '../pages/ResetPassword'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'
import { RequireAuth } from './RequireAuth'

const RoutesApp: React.FC = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />

    <Route
      path="/dashboard"
      element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      }
    />
    <Route
      path="/profile"
      element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      }
    />
  </Routes>
)

export default RoutesApp
