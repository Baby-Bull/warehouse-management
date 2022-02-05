package com.sapo.storemanagement.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ImportReceiptResponseDto {
    private String code;
    private LocalDateTime createdAt;
    private String creatorName;
    private List<LineItemDto> lineItems;

    public ImportReceiptResponseDto(String code, LocalDateTime createdAt, String creatorName, List<LineItemDto> lineItems) {
        this.code = code;
        this.createdAt = createdAt;
        this.creatorName = creatorName;
        this.lineItems = lineItems;
    }

    public String getCode() {
        return code;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public List<LineItemDto> getLineItems() {
        return lineItems;
    }
}
