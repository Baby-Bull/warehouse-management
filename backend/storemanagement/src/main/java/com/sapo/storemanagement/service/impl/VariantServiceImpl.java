package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.ProductVariantDto;
import com.sapo.storemanagement.dto.VariantDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.ForeignKeyConstraintException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.exception.UniqueKeyConstraintException;
import com.sapo.storemanagement.repository.ProductRepository;
import com.sapo.storemanagement.repository.VariantRepository;
import com.sapo.storemanagement.repository.VariantsOrderRepository;
import com.sapo.storemanagement.service.VariantService;
import com.sapo.storemanagement.utils.itemcodegenerator.ItemCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VariantServiceImpl implements VariantService {
    private final VariantRepository variantRepository;
    private final ProductRepository productRepository;
    private final VariantsOrderRepository variantsOrderRepository;

    @Autowired
    @Qualifier("variant-code-generator")
    private ItemCodeGenerator itemCodeGenerator;

    @Autowired
    public VariantServiceImpl(VariantRepository variantRepository, ProductRepository productRepository,
            VariantsOrderRepository variantsOrderRepository) {
        this.variantRepository = variantRepository;
        this.productRepository = productRepository;
        this.variantsOrderRepository = variantsOrderRepository;
    }

    @Override
    public List<Variant> listAllVariants() {
        return variantRepository.findAllByRecordStatus(RecordStatus.ACTIVE.getStatus());
    }

    @Override
    public List<Variant> listAllVariantsByProductId(Long id) {
        return variantRepository.findAllByProductId(id);
    }

    @Override
    public List<VariantsOrder> listVariantByOrderId(long orderId) {
        List<VariantsOrder> variantListByOrder = variantsOrderRepository.findVariantByOrderId(orderId);
        // List<Variant> variantList = null;
        // variantListByOrder.forEach((item) -> {
        // Variant variant =
        // variantRepository.findById(item.getVariant().getId()).orElseThrow(() -> new
        // RecordNotFoundException("variant not found"));
        // variantList.add(variant);
        // });
        return variantListByOrder;
    }

    @Override
    public Variant getVariantById(Long id) {
        if (id <= 0) {
            throw new BadNumberException("Id phải lớn hơn 0");
        }

        return variantRepository
                .findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Không tìm thấy phiên bản"));
    }

    @Override
    @Transactional
    public Variant updateVariant(long id, VariantDto variantDto) {
        Variant existingVariant = this.getVariantById(id);

        // check unique key constraint
        if(!existingVariant.getCode().equals(variantDto.getVariantCode()) &&
            variantRepository.existsByCode(variantDto.getVariantCode())) {
            throw new UniqueKeyConstraintException("Mã phiên bản sản phẩm bị trùng với phiên bản khác");
        }

//        cái này chắc không thể xảy ra
//        check foreign key constraint
//        if(!productRepository.existsById(existingVariant.getProduct().getId())) {
//            throw new ForeignKeyConstraintException("Không tìm thấy sản phẩm ứng với phiên bản này");
//        }

        existingVariant.setCode(variantDto.getVariantCode());
        existingVariant.setInventoryQuantity(variantDto.getInventoryQuantity());
        existingVariant.setSellableQuantity(variantDto.getSellableQuantity());
        existingVariant.setColor(variantDto.getColor());
        existingVariant.setImageUrl(variantDto.getImageUrl());
        existingVariant.setMaterial(variantDto.getMaterial());
        existingVariant.setSize(variantDto.getSize());
        existingVariant.setUnit(variantDto.getUnit());
        existingVariant.setRetailPrice(variantDto.getRetailPrice());
        existingVariant.setWholeSalePrice(variantDto.getWholeSalePrice());
        existingVariant.setOriginalPrice(variantDto.getOriginalPrice());

        return variantRepository.save(existingVariant);
    }

    @Override
    @Transactional
    public Variant deleteVariant(Long id) {
        Variant variant = this.getVariantById(id);
        variant.setRecordStatus(RecordStatus.DELETED);
        variantRepository.save(variant);

        productRepository.deleteProductIfNoVariantAvailable(variant.getProduct().getId());

        return variant;
    }

    @Override
    public String getLastestVariantCode() {
        return itemCodeGenerator.generate();
    }
}
