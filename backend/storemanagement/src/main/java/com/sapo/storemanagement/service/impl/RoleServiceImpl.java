package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.entities.Role;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.repository.RoleRepository;
import com.sapo.storemanagement.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role getRoleById(Long id) {
        return roleRepository
            .findById(id)
            .orElseThrow(() -> new RecordNotFoundException("Không tìm thấy vai trò tương ứng"));
    }

    @Override
    public Role getRoleByName(String name) {
        return roleRepository
            .findByName(name)
            .orElseThrow(() -> new RecordNotFoundException("Không tìm thấy vai trò"));
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }
}
