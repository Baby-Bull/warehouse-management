import React from 'react'
import { Route } from "react-router-dom";
import { grantPermission } from "./grantPermission"
import Unauthorized from "./Unauthorized"

function RoleBasedRouting({
  children, roles, ...rest
}) {
  return (
    <>
      {grantPermission(roles) ?
        <Route {...rest}> {children} </Route>
        :
        // <Route> <Unauthorized /> </Route>
        <Route {...rest}> <Unauthorized /> </Route>
      }
    </>
  );
}

export default RoleBasedRouting

