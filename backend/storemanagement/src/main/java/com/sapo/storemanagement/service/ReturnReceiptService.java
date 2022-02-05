package com.sapo.storemanagement.service;

import com.sapo.storemanagement.dto.ReturnReceiptDto;
import com.sapo.storemanagement.dto.ReturnReceiptResponseDto;
import com.sapo.storemanagement.entities.ReturnReceipt;

import java.util.List;

public interface ReturnReceiptService {
    ReturnReceipt saveReturnReceipt(Long creatorId, long orderId, ReturnReceiptDto returnReceiptDto);

    List<ReturnReceiptResponseDto> listAllReturnReceiptsByOrder(long orderId);
}
