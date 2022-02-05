package com.sapo.storemanagement.entities;

public enum SellableStatus {
    SELLABLE("Có thể bán"), UNSELLABLE("Ngừng bán");

    private String status;

    SellableStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
