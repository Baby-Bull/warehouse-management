package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.ProductDto;
import com.sapo.storemanagement.dto.ProductResponseDto;
import com.sapo.storemanagement.dto.ProductVariantDto;
import com.sapo.storemanagement.dto.VariantDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.exception.UniqueKeyConstraintException;
import com.sapo.storemanagement.repository.ProductRepository;
import com.sapo.storemanagement.repository.VariantRepository;
import com.sapo.storemanagement.service.CategoryService;
import com.sapo.storemanagement.service.ProductService;
import com.sapo.storemanagement.service.VariantService;
import com.sapo.storemanagement.utils.InputStringModifier;
import com.sapo.storemanagement.utils.itemcodegenerator.ItemCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VariantRepository variantRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private VariantService variantService;

    @Autowired
    @Qualifier("variant-code-generator")
    private ItemCodeGenerator itemCodeGenerator;

    @Override
    public Iterable<ProductResponseDto> listAllProducts() {
        List<ProductResponseDto> response = new ArrayList<>();

        List<Product> products = productRepository.findAllByRecordStatus(RecordStatus.ACTIVE.getStatus());
        products.forEach(product -> {
            response.add(this.getProductById(product.getId()));
        });

        return response;
    }

    @Override
    public ProductResponseDto getProductById(Long id) {
        if (id <= 0) {
            throw new BadNumberException("Id phải lớn hơn 0");
        }

        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RecordNotFoundException("Không tìm thấy sản phẩm có id " + id));
        long totalInventoryQuantity = productRepository.totalInventoryQuantityOfProduct(id);
        return new ProductResponseDto(product, totalInventoryQuantity);
    }

    @Override
    @Transactional
    public Product saveProduct(ProductVariantDto productVariantDto) {
        Category category = categoryService.getCategoryById(productVariantDto.getCategoryId());

        String productName = productVariantDto.getProductName();
        Product newProduct = productRepository.save(new Product(
            InputStringModifier.capitalizeFirstWord(productName),
            category,
            productVariantDto.getBrand(),
            productVariantDto.getDescription(),
            productVariantDto.getWeight(),
            productVariantDto.getImageUrl(),
            SellableStatus.SELLABLE
        ));

        List<VariantDto> variantsList = new ArrayList<VariantDto>(productVariantDto.getVariants());

        for (VariantDto variant : variantsList) {
            Variant newVariant = new Variant(
                    newProduct,
                    itemCodeGenerator.generate(),
                    variant.getInventoryQuantity(),
                    variant.getSellableQuantity(),
                    variant.getSize(),
                    variant.getColor(),
                    variant.getImageUrl(),
                    variant.getMaterial(),
                    variant.getUnit(),
                    variant.getOriginalPrice(),
                    variant.getWholeSalePrice(),
                    variant.getRetailPrice());
            variantRepository.save(newVariant);
        }

//        List<String> colors = new ArrayList<String>(productVariantDto.getColor());
//        List<String> materials = new ArrayList<String>(productVariantDto.getMaterial());
//        List<String> sizes = new ArrayList<String>(productVariantDto.getSize());
//        int colorNumbers = colors.size();
//        int materialNumbers = materials.size();
//        int sizeNumbers = sizes.size();

//        if (colorNumbers == 0 && materialNumbers == 0 && sizeNumbers == 0) {
//            Variant newVariant = new Variant(
//                    newProduct,
//                    itemCodeGenerator.generate(),
//                    productVariantDto.getInventoryQuantity(),
//                    productVariantDto.getSellableQuantity(),
//                    "",
//                    "",
//                    productVariantDto.getImageUrl(),
//                    "",
//                    productVariantDto.getUnit(),
//                    productVariantDto.getOriginalPrice(),
//                    productVariantDto.getWholeSalePrice(),
//                    productVariantDto.getRetailPrice());
//            variantRepository.save(newVariant);
//        } else {
//            if (colorNumbers == 0) colors.add(0, "");
//            if (sizeNumbers == 0) sizes.add(0, "");
//            if (materialNumbers == 0) materials.add(0, "");
//            for (String color : colors) {
//                for (String material : materials) {
//                    for (String size : sizes) {
//                        Variant newVariant = new Variant(
//                                newProduct,
//                                itemCodeGenerator.generate(),
//                                productVariantDto.getInventoryQuantity(),
//                                productVariantDto.getSellableQuantity(),
//                                size,
//                                color,
//                                productVariantDto.getImageUrl(),
//                                material,
//                                productVariantDto.getUnit(),
//                                productVariantDto.getOriginalPrice(),
//                                productVariantDto.getWholeSalePrice(),
//                                productVariantDto.getRetailPrice());
//                        newVariantsList.add(newVariant);
//                        variantRepository.save(newVariant);
//                    }
//                }
//            }
//        }
        return newProduct;
    }

    @Override
    @Transactional
    public Product updateProduct(long id, ProductDto productDto) {
        Category category = categoryService.getCategoryById(productDto.getCategoryId());

        Product productToUpdate = productRepository
                .findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Không tìm thấy sản phẩm"));
        productToUpdate.setName(productDto.getProductName());
        productToUpdate.setCategory(category);
        productToUpdate.setDescription(productDto.getDescription());
        productToUpdate.setImageUrl(productDto.getImageUrl());
        productToUpdate.setBrand(productDto.getBrand());
        productToUpdate.setWeight(productDto.getWeight());
        return productRepository.save(productToUpdate);
    }

    @Override
    @Transactional
    public Product deleteProduct(Long id) {
        if (id <= 0) {
            throw new BadNumberException("Hãy nhập id lớn hơn 0");
        }
        Product productToDelete = productRepository
                .findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Sản phẩm không tồn tại"));
        productToDelete.setRecordStatus(RecordStatus.DELETED);

        variantService.listAllVariantsByProductId(productToDelete.getId())
                .forEach(variant -> variant.setRecordStatus(RecordStatus.DELETED));
        return productToDelete;
    }

    @Override
    public Variant saveVariant(long id, VariantDto variantDto) {
        if (variantRepository.existsByCode(variantDto.getVariantCode())) {
            throw new UniqueKeyConstraintException("Mã phiên bản sản phẩm bị trùng với phiên bản khác");
        }

        String variantCode = variantDto.getVariantCode();
        if(variantDto.getVariantCode().isBlank()) {
            variantCode = itemCodeGenerator.generate();
        }

        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RecordNotFoundException("Không tìm thấy sản phẩm có id " + id));
        Variant newVariant = new Variant(
                product,
                variantCode,
                variantDto.getInventoryQuantity(),
                variantDto.getSellableQuantity(),
                variantDto.getSize(),
                variantDto.getColor(),
                variantDto.getImageUrl(),
                variantDto.getMaterial(),
                variantDto.getUnit(),
                variantDto.getOriginalPrice(),
                variantDto.getWholeSalePrice(),
                variantDto.getRetailPrice()
        );
        return variantRepository.save(newVariant);
    }

}
