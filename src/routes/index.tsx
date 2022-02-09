import React from 'react'
import { Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import RouteApp from './RouteApp'

const RoutesApp: React.FC = () => (
  <Routes>
    <RouteApp path="/" element={SignIn} />
  </Routes>
)

export default RoutesApp
