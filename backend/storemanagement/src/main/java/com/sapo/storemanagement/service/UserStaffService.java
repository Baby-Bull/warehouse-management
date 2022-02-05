package com.sapo.storemanagement.service;

import com.sapo.storemanagement.entities.Supplier;
import com.sapo.storemanagement.entities.User;

import java.util.Optional;

public interface UserStaffService {

    User getUserById(Long id);

    Iterable<User> listAllUsersByRecordStatus();

    User getUserByUsername(String username);

    User updateUser(Long id, User user);

    String deleteUser(Long id);

    Iterable<User> listAllUsers();

}
