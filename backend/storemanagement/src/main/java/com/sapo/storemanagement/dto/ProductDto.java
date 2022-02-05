package com.sapo.storemanagement.dto;

import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
public class ProductDto {
    @NotBlank(message = "Không được bỏ trống tên sản phẩm")
    @Size(max = 64, message = "Độ dài tên sản phẩm không được vượt quá {max} kí tự")
    private String productName;

    @NotNull(message = "Không được bỏ trống danh mục sản phẩm")
    @Min(value = 0, message = "Mã danh mục không được nhỏ hơn 0")
    private Long categoryId;

    @NotNull(message = "Nhãn hiệu sản phẩm không được null")
    @Size(max = 32, message = "Độ dài nhãn hiệu sản phẩm không được vượt quá {max} kí tự")
    private String brand;

    @NotNull(message = "Khối lượng sản phẩm không được null")
    @Min(value = 0, message = "Khối lượng sản phẩm không được nhở hơn {value}")
    private Double weight;

    @NotNull(message = "Mô tả sản phẩm không được null")
    @Size(max = 255, message = "Độ dài mô tả sản phẩm không được vượt quá {max} kí tự")
    private String description;

    @Size(max = 255, message = "Độ dài đường dẫn ảnh không được vượt quá {max} kí tự")
    private String imageUrl;
}
