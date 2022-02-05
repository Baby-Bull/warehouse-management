package com.sapo.storemanagement.service;

import com.sapo.storemanagement.dto.ImportReceiptDto;
import com.sapo.storemanagement.dto.ImportReceiptResponseDto;
import com.sapo.storemanagement.entities.ImportReceipt;

import java.util.List;

public interface ImportReceiptService {
    List<ImportReceipt> listAllImportReceipts();

    ImportReceipt getImportReceiptById(long id);

    ImportReceipt saveImportReceipt(long creatorId, long orderId, ImportReceiptDto importReceiptDto);

    List<ImportReceiptResponseDto> listAllImportReceiptsByOrder(long orderId);
}
