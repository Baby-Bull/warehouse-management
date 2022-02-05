package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.dto.VariantDto;
import com.sapo.storemanagement.entities.Variant;
import com.sapo.storemanagement.entities.VariantsOrder;
import com.sapo.storemanagement.service.VariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/variants")
@CrossOrigin
public class VariantController {
    private final VariantService variantService;

    @Autowired
    public VariantController(VariantService variantService) {
        this.variantService = variantService;
    }

    @GetMapping("/{id}")
    public Variant findVariantById(@PathVariable long id) {
        return variantService.getVariantById(id);
    }

    @GetMapping
    public List<Variant> findAllVariants() {
        return variantService.listAllVariants();
    }

    @GetMapping("/get-lastest-variant-code")
    public String getLastestVariantCode() {
        return variantService.getLastestVariantCode();
    }

    @PutMapping("/{id}")
    public Variant updateVariant(@PathVariable long id, @RequestBody @Valid VariantDto variantDto){
        return variantService.updateVariant(id, variantDto);
    }

    @DeleteMapping("/{id}")
    public Variant deleteVariant(@PathVariable long id) {
        return variantService.deleteVariant(id);
    }
}
