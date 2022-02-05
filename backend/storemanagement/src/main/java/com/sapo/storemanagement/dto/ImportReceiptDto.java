package com.sapo.storemanagement.dto;

import java.util.List;

public class ImportReceiptDto {
    private List<LineItemDto> lineItems;

    public List<LineItemDto> getLineItems() {
        return lineItems;
    }

    public long getTotalQuantity() {
        long totalQuantity = 0;
        for (LineItemDto lineItem : lineItems) {
            totalQuantity += lineItem.getQuantity();
        }
        return totalQuantity;
    }
}
