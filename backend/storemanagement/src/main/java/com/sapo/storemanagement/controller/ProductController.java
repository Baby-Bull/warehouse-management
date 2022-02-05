package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.dto.ProductDto;
import com.sapo.storemanagement.dto.ProductResponseDto;
import com.sapo.storemanagement.dto.ProductVariantDto;
import com.sapo.storemanagement.dto.VariantDto;
import com.sapo.storemanagement.entities.Product;
import com.sapo.storemanagement.entities.Variant;
import com.sapo.storemanagement.service.ProductService;
import com.sapo.storemanagement.service.VariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private VariantService variantService;

    @GetMapping("")
    public Iterable<ProductResponseDto> listAllProducts() { return productService.listAllProducts(); }

    @GetMapping("/{id}/variants")
    public List<Variant> listAllVariantsByProductId(@PathVariable long id){
        return variantService.listAllVariantsByProductId(id);
    }

    @GetMapping("/{id}")
    ProductResponseDto getProductById(@PathVariable(name = "id") long id) { return productService.getProductById(id); }

    @PostMapping
    Product saveProduct(@RequestBody @Valid ProductVariantDto newProduct) {
        return productService.saveProduct(newProduct);
    }

    @PostMapping("/{id}/create-variant")
    Variant saveVariant(@PathVariable(name = "id") long id, @RequestBody @Valid VariantDto variantDto) {
        return productService.saveVariant(id, variantDto);
    }

    @PutMapping("/{id}")
    Product updateProduct(@PathVariable(name = "id") long id, @RequestBody @Valid ProductDto updateProduct) {
        return productService.updateProduct(id, updateProduct);
    }

    @DeleteMapping("/{id}")
    Product deleteProduct(@PathVariable(name = "id") long id) {
        return productService.deleteProduct(id);
    }

}
