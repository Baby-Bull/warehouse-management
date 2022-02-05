package com.sapo.storemanagement.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class ReturnReceiptDto {
    private List<LineItemDto> lineItems;

    @NotNull(message = "Ghi chú của đơn hoàn trả không được null")
    @Size(max = 255, message = "Độ dài của ghi chú không được vượt quá {max}")
    private String note;

    public List<LineItemDto> getLineItems() {
        return lineItems;
    }

    public String getNote() {
        return note;
    }
}
