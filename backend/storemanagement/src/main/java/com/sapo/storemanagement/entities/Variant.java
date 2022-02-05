package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "variants", indexes = {
        @Index(name = "variants_code_unique", columnList = "code", unique = true),
        @Index(name = "variants_product_id_foreign", columnList = "product_id")
})
public class Variant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id", nullable = false)
//    @JsonIgnore
    private Product product;

    @Column(name = "code", nullable = false, unique = true, length = 16)
    @NotBlank(message = "Không được để trống mã phiên bản")
    @Size(max = 16, message = "Độ dài mã phiên bản không được vượt quá {max} kí tự")
    private String code;

    @Column(name = "inventory_quantity", nullable = false)
    @Min(value = 0, message = "Lượng hàng tồn kho không được nhỏ hơn {value}")
    private Long inventoryQuantity = 0L;

    @Column(name = "sellable_quantity", nullable = false)
    @Min(value = 0, message = "Lượng hàng có thể bán không được nhỏ hơn {value}")
    private Long sellableQuantity = 0L;

    @Column(name = "size", length = 8)
    @NotNull(message = "Kích thước của phiên bản không được null")
    @Size(max = 8, message = "Độ dài kích thước phiên bản không được vượt quá {max}")
    private String size = "";

    @Column(name = "color", length = 16)
    @NotNull(message = "Màu phiên bản không được null")
    @Size(max = 16, message = "Độ dài màu phiên bản không được vượt quá {max} kí tự")
    private String color = "";

    @Column(name = "material", length = 32)
    @NotNull(message = "Chất liệu phiên bản không được null")
    @Size(max = 32, message = "Độ dài chất liệu phiên bản không được vượt quá {max} kí tự")
    private String material = "";

    @Column(name = "unit", length = 16)
    @NotNull(message = "Đơn vị tính phiên bản không được null")
    @Size(max = 16, message = "Độ dài đơn vị tính phiên bản không được vượt quá {max} kí tự")
    private String unit = "";

    @Column(name = "imageUrl")
    private String imageUrl = "";

    @Column(name = "original_price", nullable = false)
    @NotNull(message = "Hãy nhập giá nhập của phiên bản")
    @Min(value = 0, message = "Giá nhập không được nhỏ hơn {value}")
    private Double originalPrice = 0.0;

    @Column(name = "whole_sale_price", nullable = false)
    @NotNull(message = "Hãy nhập giá bán buôn của phiên bản")
    @Min(value = 0, message = "Giá bán buôn không được nhỏ hơn {value}")
    private Double wholeSalePrice = 0.0;

    @Column(name = "retail_price", nullable = false)
    @NotNull(message = "Hãy nhập giá bán lẻ của phiên bản")
    @Min(value = 0, message = "Giá bán lẻ không được nhỏ hơn {value}")
    private Double retailPrice = 0.0;

    @Column(name = "record_status", length = 32)
    private RecordStatus recordStatus = RecordStatus.ACTIVE;

    @Column(name = "sell_status", columnDefinition = "varchar(32) DEFAULT 'Có thể bán'")
    private SellableStatus sellableStatus = SellableStatus.SELLABLE;

    public Variant() {
    }

    public Variant(Product product, String code, Long inventoryQuantity,
                   Long sellableQuantity, Double originalPrice,
                   Double wholeSalePrice, Double retailPrice) {
        this.product = product;
        this.code = code;
        this.inventoryQuantity = inventoryQuantity;
        this.sellableQuantity = sellableQuantity;
        this.originalPrice = originalPrice;
        this.wholeSalePrice = wholeSalePrice;
        this.retailPrice = retailPrice;
    }

    public Variant(Product product, String code, Long inventoryQuantity,
                   Long sellableQuantity, String size, String color, String imageUrl,
                   String material, String unit, Double originalPrice,
                   Double wholeSalePrice, Double retailPrice) {
        this.product = product;
        this.code = code;
        this.inventoryQuantity = inventoryQuantity;
        this.sellableQuantity = sellableQuantity;
        this.size = size;
        this.color = color;
        this.imageUrl= imageUrl;
        this.material = material;
        this.unit = unit;
        this.originalPrice = originalPrice;
        this.wholeSalePrice = wholeSalePrice;
        this.retailPrice = retailPrice;
    }

    public Variant(Product product, String code, Long inventoryQuantity,
                   Long sellableQuantity, String size, String color, String imageUrl,
                   String material, String unit, Double originalPrice,
                   Double wholeSalePrice, Double retailPrice, SellableStatus sellableStatus) {
        this.product = product;
        this.code = code;
        this.inventoryQuantity = inventoryQuantity;
        this.sellableQuantity = sellableQuantity;
        this.size = size;
        this.color = color;
        this.imageUrl = imageUrl;
        this.material = material;
        this.unit = unit;
        this.originalPrice = originalPrice;
        this.wholeSalePrice = wholeSalePrice;
        this.retailPrice = retailPrice;
        this.sellableStatus = sellableStatus;
    }

    public Long getId() {
        return id;
    }

    public String getVariantName() {
        StringBuilder stringBuilder = new StringBuilder(this.product.getName());
        if (this.color != null && !this.color.isBlank()) {
            stringBuilder.append(" - ").append(this.color);
        }
        if (this.material != null && !this.material.isBlank()) {
            stringBuilder.append(" - ").append(this.material);
        }
        if (this.size != null && !this.size.isBlank()) {
            stringBuilder.append(" - ").append(this.size);
        }
        return stringBuilder.toString();
    }

    public Product getProduct() {
        return product;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Long getInventoryQuantity() {
        return inventoryQuantity;
    }

    public void setInventoryQuantity(@NotNull Long inventoryQuantity) {
        this.inventoryQuantity = inventoryQuantity;
    }

    public Long getSellableQuantity() {
        return sellableQuantity;
    }

    public void setSellableQuantity(@NotNull Long sellableQuantity) {
        this.sellableQuantity = sellableQuantity;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public Double getWholeSalePrice() {
        return wholeSalePrice;
    }

    public void setWholeSalePrice(Double wholeSalePrice) {
        this.wholeSalePrice = wholeSalePrice;
    }

    public Double getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(Double retailPrice) {
        this.retailPrice = retailPrice;
    }

    public String getRecordStatus() {
        return recordStatus.getStatus();
    }

    public void setRecordStatus(RecordStatus recordStatus) {
        this.recordStatus = recordStatus;
    }

    public String getSellableStatus() {
        return sellableStatus.getStatus();
    }

    public void setSellableStatus(SellableStatus sellableStatus) {
        this.sellableStatus = sellableStatus;
    }
}