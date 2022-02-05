package com.sapo.storemanagement.entities;

public enum ImportedStatus {
    AWAITING("Chờ nhập kho"), IMPORTED("Đã nhập kho"), PARTIAL_IMPORTED("Nhập kho một phần"),
    PARTIAL_REFUND("Hoàn trả một phần"), FULL_REFUND("Hoàn trả toàn bộ");

    private String status;

    ImportedStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
