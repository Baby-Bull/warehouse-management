package com.sapo.storemanagement.entities;

public enum SupplierStatus {
    COOPERATIVE("Đang hợp tác"), UNCOOPERATIVE("Ngừng hợp tác");

    private String status;

    SupplierStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
