package com.sapo.storemanagement.service;

import com.sapo.storemanagement.dto.VariantDto;
import com.sapo.storemanagement.entities.Variant;
import com.sapo.storemanagement.entities.VariantsOrder;

import java.util.List;

public interface VariantService {

    List<Variant> listAllVariants();

    List<Variant> listAllVariantsByProductId(Long id);

    List<VariantsOrder> listVariantByOrderId(long id);

    Variant getVariantById(Long id);

    Variant updateVariant(long id, VariantDto variantDto);

    Variant deleteVariant(Long id);

    String getLastestVariantCode();
}
