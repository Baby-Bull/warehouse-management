package com.sapo.storemanagement.entities;

public enum RecordStatus {
    ACTIVE("Đang hoạt động"), DELETED("Đã xóa");

    private String status;

    RecordStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
