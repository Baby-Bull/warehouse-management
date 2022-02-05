package com.sapo.storemanagement.dto;

import com.sapo.storemanagement.entities.Role;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class RegisterRequest {
    @NotBlank(message = "Tên tài khoản không được để trống")
    @Size(max = 32, message = "Độ dài tên tài khoản không được vượt quá {max}")
    private String username;

    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 8, max = 255, message = "Độ dài tên mật khẩu phải nằm giữa {min} và {max}")
    private String password;

    @NotBlank(message = "Không được để trống email")
    @Email(message = "Email không hợp lệ")
    private String email;

    @NotNull(message = "Vai trò của người dùng không được null")
    private String role;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getRole(){ return role;}
}
