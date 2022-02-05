package com.sapo.storemanagement.entities;

public enum TransactionStatus {
    UNPAID("Chưa thanh toán"), PARTIAL_PAID("Thanh toán một phần"), PAID("Đã thanh toán");

    private String status;

    TransactionStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
