package com.sapo.storemanagement.utils.itemcodegenerator;

import com.sapo.storemanagement.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component("supplier-code-generator")
public class SupplierCodeGenerator extends ItemCodeGenerator {
    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    protected String getPrefix() {
        return "NCC";
    }

    @Override
    protected long countRecords() {
        return supplierRepository.count();
    }
}
