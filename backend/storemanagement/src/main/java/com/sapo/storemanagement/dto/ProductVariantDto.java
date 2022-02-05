package com.sapo.storemanagement.dto;

import javax.persistence.Column;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class ProductVariantDto {
    @NotBlank(message = "Không được bỏ trống tên sản phẩm")
    @Size(max = 64, message = "Độ dài tên sản phẩm không được vượt quá {max} kí tự")
    private String productName;
    private Long productId;

    @NotNull(message = "Không được bỏ trống danh mục sản phẩm")
    @Min(value = 0, message = "Mã danh mục không được nhỏ hơn 0")
    private Long categoryId;

    @NotNull(message = "Nhãn hiệu sản phẩm không được null")
    @Size(max = 32, message = "Độ dài nhãn hiệu sản phẩm không được vượt quá {max} kí tự")
    private String brand;

    @NotNull(message = "Khối lượng sản phẩm không được null")
    @Min(value = 0, message = "Khối lượng sản phẩm không được nhở hơn {value}")
    private Double weight;

    @NotNull(message = "Đơn vị tính phiên bản không được null")
    @Size(max = 16, message = "Độ dài đơn vị tính phiên bản không được vượt quá {max} kí tự")
    private String unit;

    @NotNull(message = "Mô tả sản phẩm không được null")
    @Size(max = 255, message = "Độ dài mô tả sản phẩm không được vượt quá {max} kí tự")
    private String description;

//    @NotNull(message = "Mã phiên bản không được null")
    @Size(max = 16, message = "Độ dài mã phiên bản không được vượt quá {max} kí tự")
    private String variantCode;

//    @NotNull(message = "Đường dẫn ảnh không được null")
    @Size(max = 255, message = "Độ dài đường dẫn ảnh không được vượt quá {max} kí tự")
    private String imageUrl;

    @NotNull(message = "Hãy nhập giá bán lẻ của phiên bản")
    @Min(value = 0, message = "Giá bán lẻ không được nhỏ hơn {value}")
    private Double retailPrice;

    @NotNull(message = "Hãy nhập giá bán buôn của phiên bản")
    @Min(value = 0, message = "Giá bán buôn không được nhỏ hơn {value}")
    private Double wholeSalePrice;

    @NotNull(message = "Hãy nhập giá nhập của phiên bản")
    @Min(value = 0, message = "Giá nhập không được nhỏ hơn {value}")
    private Double originalPrice;

    private List<String> size;
    private List<String> color;
    private List<String> material;

    @NotNull(message = "Lượng hàng tồn kho không được null")
    @Min(value = 0, message = "Lượng hàng tồn kho không được nhỏ hơn {value}")
    private Long inventoryQuantity;

    @NotNull(message = "Lượng hàng có thể bán không được null")
    @Min(value = 0, message = "Lượng hàng có thể bán không được nhỏ hơn {value}")
    private Long sellableQuantity;

    private List<VariantDto> variants;

    public List<VariantDto> getVariants() {
        return variants;
    }

    public String getProductName() {
        return productName;
    }

    public Long getProductId() { return productId; }

    public Long getCategoryId() {
        return categoryId;
    }

    public String getBrand() {
        return brand;
    }

    public Double getWeight() {
        return weight;
    }

    public String getUnit() {
        return unit;
    }

    public String getDescription() {
        return description;
    }

    public String getVariantCode() {
        return variantCode;
    }

    public Double getRetailPrice() {
        return retailPrice;
    }

    public Double getWholeSalePrice() {
        return wholeSalePrice;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public List<String> getColor() {
        return color;
    }

    public List<String> getMaterial() {
        return material;
    }

    public List<String> getSize() {
        return size;
    }

    public Long getInventoryQuantity() {
        return inventoryQuantity;
    }

    public Long getSellableQuantity() {
        return sellableQuantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
