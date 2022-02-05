package com.sapo.storemanagement.service;

import com.sapo.storemanagement.dto.ProductDto;
import com.sapo.storemanagement.dto.ProductResponseDto;
import com.sapo.storemanagement.dto.ProductVariantDto;
import com.sapo.storemanagement.dto.VariantDto;
import com.sapo.storemanagement.entities.Product;
import com.sapo.storemanagement.entities.Variant;

public interface ProductService {
    Iterable<ProductResponseDto> listAllProducts();

    ProductResponseDto getProductById(Long id);

    Product saveProduct(ProductVariantDto productVariantDto);

    Product updateProduct(long id, ProductDto productDto);

    Product deleteProduct(Long id);

    Variant saveVariant(long id, VariantDto variantDto);
}
