package com.sapo.storemanagement.dto;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

public class LoginRequest implements Serializable {
    @NotBlank(message = "Không được để trống tên tài khoản")
    private String username;

    @NotBlank(message = "Không được để trống mật khẩu")
    private String password;

    public LoginRequest() {
    }

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
