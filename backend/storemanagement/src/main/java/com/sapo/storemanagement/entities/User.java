package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(
    name = "users",
    indexes = {
        @Index(name = "username", columnList = "username", unique = true),
        @Index(name = "email", columnList = "email", unique = true)
    }
)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "username", nullable = false, unique = true, length = 32)
    @NotNull(message = "Tên người dùng không được null")
    @Size(max = 32, message = "Độ dài tên người dùng không được vượt quá {max} kí tự")
    private String username;

    @Column(name = "password", nullable = false)
    @NotNull(message = "Mật khẩu không được null")
    @Size(min = 8, max = 255, message = "Độ dài mật khẩu phải nằm trong khoảng {min} and {max}")
    private String password;

    @Column(name = "email", nullable = false, unique = true, length = 128)
    @NotBlank(message = "Không được để trống email")
    @Email
    private String email;

    @Column(name = "record_status", length = 32)
    private RecordStatus recordStatus = RecordStatus.ACTIVE;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_role",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    public User() {
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = new HashSet<>();
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void addRole(Role role) {
        this.roles.add(role);
    }

    public RecordStatus getRecordStatus() {
        return recordStatus;
    }

    public void setRecordStatus(RecordStatus recordStatus) {
        this.recordStatus = recordStatus;
    }
}