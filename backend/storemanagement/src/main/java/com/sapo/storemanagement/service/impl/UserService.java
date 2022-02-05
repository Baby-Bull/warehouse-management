package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.entities.AppUserDetails;
import com.sapo.storemanagement.entities.Role;
import com.sapo.storemanagement.entities.User;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.exception.UniqueKeyConstraintException;
import com.sapo.storemanagement.repository.RoleRepository;
import com.sapo.storemanagement.repository.UserRepository;
import com.sapo.storemanagement.dto.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Locates the user based on the username. In the actual implementation, the search
     * may be case-sensitive, or case-insensitive depending on how the
     * implementation instance is configured. In this case, the <code>UserDetails</code>
     * object that comes back may have a username that is of a different case than what
     * was actually requested.
     *
     * @param username the username identifying the user whose data is required.
     * @return a fully populated user record (never <code>null</code>)
     * @throws UsernameNotFoundException if the user could not be found or the user has no
     *                                   GrantedAuthority
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
          //  .orElseThrow(() -> new UsernameNotFoundException("Username" + username + " not found"));
        return new AppUserDetails(user);
    }

    public void createAdminAccount(RegisterRequest loginRequest) {
        String username = loginRequest.getUsername();
        String email = loginRequest.getEmail();

        if(userRepository.existsByUsername(username)) {
            throw new UniqueKeyConstraintException("Tên tài khoản bị trùng");
        }

        if(userRepository.existsByEmail(email)) {
            throw new UniqueKeyConstraintException("Email đã tồn tại");
        }

        String encodedPassword = passwordEncoder.encode(loginRequest.getPassword());
        User user = new User(username, encodedPassword, email);
        Role role = roleRepository.findByName("ADMIN").orElseThrow(() -> new RecordNotFoundException("Không tìm thấy vai trò"));
        user.addRole(role);

        userRepository.save(user);
    }

    public void createUserStaffAccount(RegisterRequest loginRequest) {
        String username = loginRequest.getUsername();
        String email = loginRequest.getEmail();

        if(userRepository.existsByUsername(username)) {
            throw new UniqueKeyConstraintException("Tên tài khoản bị trùng");
        }

        if(userRepository.existsByEmail(email)) {
            throw new UniqueKeyConstraintException("Email đã tồn tại");
        }

        String encodedPassword = passwordEncoder.encode(loginRequest.getPassword());
        User user = new User(username, encodedPassword, email);
        Role role = roleRepository.findByName(loginRequest.getRole()).orElseThrow(() -> new RecordNotFoundException("Không tìm thấy vai trò"));
        user.addRole(role);

        userRepository.save(user);
    }

    public User getUserById(long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Khôngg tìm thấy người dùng"));
    }
}
