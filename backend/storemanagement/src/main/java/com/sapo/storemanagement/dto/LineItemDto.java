package com.sapo.storemanagement.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class LineItemDto {
    @NotNull(message = "Mã phiên bản không được null")
    @Min(value = 0, message = "Mã phiên bản không được nhỏ hơn {value}")
    private Long variantId;

    @NotBlank(message = "Không được bỏ trống tên sản phẩm")
    private String name;

    @Min(value = 0, message = "Giá của sản phẩm không được nhỏ hơn {value}")
    private Double price;

    @Min(value = 0, message = "Số lượng không được nhỏ hơn {value}")
    private Long quantity;

    public LineItemDto(Long variantId, String name, Double price, Long quantity) {
        this.variantId = variantId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public Long getVariantId() {
        return variantId;
    }

    public String getName() {
        return name;
    }

    public Double getPrice() {
        return price;
    }

    public Long getQuantity() {
        return quantity;
    }
}
