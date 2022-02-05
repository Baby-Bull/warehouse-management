package com.sapo.storemanagement.service;

import com.sapo.storemanagement.entities.Role;

public interface RoleService {
    Role getRoleById(Long id);

    Role getRoleByName(String name);

    Role saveRole(Role role);
}
