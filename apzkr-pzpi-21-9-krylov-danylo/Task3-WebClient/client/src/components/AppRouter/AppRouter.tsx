import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserSessionContext } from '../..';
import { authRoutes, publicRoutes } from '../../routes'

export const AppRouter = observer(() => {
  const { isAuthorized, user } = useContext(UserSessionContext)!;
    
    const checkRole = (roles: string[], userRoles?: string[]) => {
        return roles.some(role => userRoles?.includes(role))
    }

  return (
    <>
        {isAuthorized &&
          <Routes>
          {authRoutes.map(({path, Component, roles}) =>
            checkRole(roles!, user?.role) ? (
                <Route path={path} key={path} element={<Component></Component>} />
            ) : null
          )}
          </Routes>
    }
        <Routes>
          {publicRoutes.map(({path, Component}) => 
                <Route path={path} element={<Component></Component>} key={path}/>
          )}
        </Routes>     
    </>
  )
});
