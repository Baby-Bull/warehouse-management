import React from 'react'
import {grantPermission} from "./grantPermission"

function UnlockAccess({ children, request }) {
    const permission = grantPermission(request); // request = ['ROLE_ADMIN'] / ['ROLE_USER'] / ['ROLE_MANAGER']
    return (
      <>
        {permission && children}
      </>
    );
  };

export default UnlockAccess
