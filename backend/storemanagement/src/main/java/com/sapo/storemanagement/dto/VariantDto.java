package com.sapo.storemanagement.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class VariantDto {
    @NotNull(message = "Mã phiên bản không được null")
    @Size(max = 16, message = "Độ dài mã phiên bản không được vượt quá {max} kí tự")
    private String variantCode;

    @NotNull(message = "Đơn vị tính phiên bản không được null")
    @Size(max = 16, message = "Độ dài đơn vị tính phiên bản không được vượt quá {max} kí tự")
    private String unit;

    @NotNull(message = "Kích thước của phiên bản không được null")
    @Size(max = 8, message = "Độ dài kích thước phiên bản không được vượt quá {max}")
    private String size;

    @NotNull(message = "Màu phiên bản không được null")
    @Size(max = 16, message = "Độ dài màu phiên bản không được vượt quá {max} kí tự")
    private String color;

    @NotNull(message = "Chất liệu phiên bản không được null")
    @Size(max = 32, message = "Độ dài chất liệu phiên bản không được vượt quá {max} kí tự")
    private String material;

    @NotNull(message = "Hãy nhập giá bán lẻ của phiên bản")
    @Min(value = 0, message = "Giá bán lẻ không được nhỏ hơn {value}")
    private Double retailPrice;

    @NotNull(message = "Hãy nhập giá bán buôn của phiên bản")
    @Min(value = 0, message = "Giá bán buôn không được nhỏ hơn {value}")
    private Double wholeSalePrice;

    @NotNull(message = "Hãy nhập giá nhập của phiên bản")
    @Min(value = 0, message = "Giá nhập không được nhỏ hơn {value}")
    private Double originalPrice;

    @Min(value = 0, message = "Lượng hàng tồn kho không được nhỏ hơn {value}")
    private Long inventoryQuantity;

    @Min(value = 0, message = "Lượng hàng có thể bán không được nhỏ hơn {value}")
    private Long sellableQuantity;

//    @NotNull(message = "Đường dẫn ảnh không được null")
    @Size(max = 255, message = "Độ dài đường dẫn ảnh không được vượt quá {max} kí tự")
    private String imageUrl;

    public String getVariantCode() { return variantCode; }

    public String getSize() { return size; }

    public String getUnit() { return unit; }

    public String getColor() { return color; }

    public String getImageUrl() { return imageUrl; }

    public String getMaterial() { return material; }

    public Double getRetailPrice() {
        return retailPrice;
    }

    public Double getWholeSalePrice() {
        return wholeSalePrice;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public Long getInventoryQuantity() {
        return inventoryQuantity;
    }

    public Long getSellableQuantity() {
        return sellableQuantity;
    }
}
