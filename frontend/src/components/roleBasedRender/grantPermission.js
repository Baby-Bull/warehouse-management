export const grantPermission = (requestedRoles) => {
    const permittedRoles = JSON.parse( sessionStorage.getItem('token'))?.role[0].name;

    // in case of multiple roles, if one of the permittedRoles is present in requestedRoles, return true;
    let decision = requestedRoles.includes(permittedRoles);
    return decision;
  };