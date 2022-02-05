package com.sapo.storemanagement.utils.itemcodegenerator;

import com.sapo.storemanagement.repository.ImportReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component(value = "import-receipt-code-generator")
public class ImportReceiptCodeGenerator extends ItemCodeGenerator {
    @Autowired
    private ImportReceiptRepository importReceiptRepository;

    @Override
    protected String getPrefix() {
        return "ICN";
    }

    @Override
    protected long countRecords() {
        return importReceiptRepository.count();
    }
}
