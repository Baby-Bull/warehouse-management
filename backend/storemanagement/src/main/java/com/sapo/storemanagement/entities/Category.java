package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = 32)
    @NotBlank(message = "Không được để trống tên danh mục")
    @Size(max = 32, message = "Độ dài tên danh mục không được vượt quá {max} kí tự")
    private String name;

    @Column(name = "description")
    @NotNull(message = "Mô tả sản phẩm không được null")
    @Size(max = 255, message = "Độ dài mô tả sản phẩm không được vượt quá {max} kí tự")
    private String description = "";

    public Category() {
    }

    public Category(String name) {
        this.name = name;
    }

    public Category(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}