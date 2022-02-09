import React from 'react'
import { Navigate, Route, RouteProps } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface Props extends RouteProps {
  isPrivate?: boolean
  element: React.ComponentType
}

const RouteApp: React.FC<Props> = ({
  isPrivate = false,
  element: Component,
  ...rest
}) => {
  const { user } = useAuth()

  const element =
    isPrivate === !!user ? (
      <Component />
    ) : (
      <Navigate
        state={{ from: location }}
        to={{
          pathname: isPrivate ? '/' : '/dashboard',
        }}
      />
    )

  return <Route {...rest} element={element} />
}

export default RouteApp
