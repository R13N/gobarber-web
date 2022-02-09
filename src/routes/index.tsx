import React from 'react'
import { Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { ForgotPassword } from '../pages/ForgotPassword'
import { Profile } from '../pages/Profile'
import { ResetPassword } from '../pages/ResetPassword'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'
import RouteApp from './RouteApp'

const RoutesApp: React.FC = () => (
  <Routes>
    <RouteApp path="/" element={SignIn} />
    <RouteApp path="/signup" element={SignUp} />
    <RouteApp path="/forgot-password" element={ForgotPassword} />
    <RouteApp path="/reset-password" element={ResetPassword} />

    <RouteApp path="/dashboard" element={Dashboard} isPrivate />
    <RouteApp path="/profile" element={Profile} isPrivate />
  </Routes>
)

export default RoutesApp
