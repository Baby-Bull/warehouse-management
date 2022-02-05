package com.sapo.storemanagement.security;

import com.sapo.storemanagement.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final String ROLE_ADMIN = "ADMIN";
    private final String ROLE_STORAGE_KEEPER = "Nhân viên kho";
    private final String ROLE_ACCOUNTANT = "Kế toán";

    @Autowired
    private UserService userService;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors()
            .and()
            .csrf().disable()
            .authorizeRequests()
            .antMatchers("/login", "/register").permitAll()
            .antMatchers(HttpMethod.GET).hasAnyAuthority(ROLE_ADMIN, ROLE_STORAGE_KEEPER, ROLE_ACCOUNTANT)
            .antMatchers(HttpMethod.POST, "/users").hasAnyAuthority(ROLE_ADMIN)
            .antMatchers("/report/**").hasAnyAuthority(ROLE_ADMIN, ROLE_STORAGE_KEEPER, ROLE_ACCOUNTANT)
            .antMatchers("/orders/**/payment-invoices").hasAnyAuthority(ROLE_ADMIN, ROLE_ACCOUNTANT)
            .antMatchers("/products/**", "/variants/**", "/orders/**").hasAnyAuthority(ROLE_ADMIN, ROLE_STORAGE_KEEPER)
            .antMatchers("/suppliers/**", "/import-receipts/**").hasAnyAuthority(ROLE_ADMIN, ROLE_STORAGE_KEEPER)
            .antMatchers("/payment-invoices/**").hasAnyAuthority(ROLE_ADMIN, ROLE_ACCOUNTANT)
            .anyRequest().authenticated()
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

//    private void storageKeeperConfig(HttpSecurity http) throws Exception {
//        http.authorizeRequests().antMatchers("/products/**", "/variants/**", "/orders/**").hasAnyAuthority("ADMIN", "STORAGE_KEEPER");
//        http.authorizeRequests().antMatchers("/suppliers/**", "/import-receipts/**").hasAnyAuthority("ADMIN", "STORAGE_KEEPER");
//    }
//
//    private void accountantConfig(HttpSecurity http) throws Exception {
//        http.authorizeRequests().antMatchers("/payment-invoices/**").hasAnyAuthority("ADMIN", "ACCOUNTANT");
//    }
}
