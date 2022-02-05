package com.sapo.storemanagement.utils;

import com.sapo.storemanagement.entities.AppUserDetails;
import com.sapo.storemanagement.entities.User;
import com.sapo.storemanagement.security.JwtAuthenticationFilter;
import com.sapo.storemanagement.security.JwtTokenProvider;
import com.sapo.storemanagement.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;

@Component
public class RequestUtils {
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;

    public Long getUserIdFromRequest(HttpServletRequest servletRequest) {
        String jwt = jwtAuthenticationFilter.getJwtFromRequest(servletRequest);
        if(jwt == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid jwt token");
        }
        String username = jwtTokenProvider.getUsernameFromJwt(jwt);
        User user = ((AppUserDetails) userService.loadUserByUsername(username)).getUser();
        return user.getId();
    }
}
