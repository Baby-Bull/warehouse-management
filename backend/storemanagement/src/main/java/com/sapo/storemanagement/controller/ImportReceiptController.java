package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.entities.ImportReceipt;
import com.sapo.storemanagement.service.ImportReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/import-receipts")
@CrossOrigin
public class ImportReceiptController {
    private final ImportReceiptService importReceiptService;

    @Autowired
    public ImportReceiptController(ImportReceiptService importReceiptService) {
        this.importReceiptService = importReceiptService;
    }

    @GetMapping("/{id}")
    public ImportReceipt findImportReceiptById(@PathVariable long id){
        return importReceiptService.getImportReceiptById(id);
    }

    @GetMapping
    public List<ImportReceipt> findAllImportReceipts(){
        return importReceiptService.listAllImportReceipts();
    }
}
