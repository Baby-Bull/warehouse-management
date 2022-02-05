package com.sapo.storemanagement.dto;

import com.sapo.storemanagement.entities.Product;

import java.time.LocalDateTime;

public class ProductResponseDto {
    private Long id;
    private String name;
    private String category;
    private Double weight;
    private Long stock;
    private String brand;
    private String description;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ProductResponseDto(Long id, String name, String category, Double weight,
                              Long stock, String brand, String description,
                              String imageUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.weight = weight;
        this.stock = stock;
        this.brand = brand;
        this.description = description;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public ProductResponseDto(Product product, long stock) {
        this(product.getId(), product.getName(), product.getCategory().getName(),
            product.getWeight(), stock,
            product.getBrand(), product.getDescription(), product.getImageUrl(),
            product.getCreatedAt(), product.getUpdatedAt());
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public Double getWeight() {
        return weight;
    }

    public Long getStock() {
        return stock;
    }

    public String getBrand() {
        return brand;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
