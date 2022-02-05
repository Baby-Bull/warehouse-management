package com.sapo.storemanagement.dto;

public class ReportEachMonthDto {
    private long totalOrders;
    private long totalSuppliedQuantity;
    private double totalAmount;
    private double paidAmount;
    private double debtAmount;

    public ReportEachMonthDto(long totalOrders, long totalSuppliedQuantity, double totalAmount, double paidAmount, double debtAmount) {
        this.totalOrders = totalOrders;
        this.totalSuppliedQuantity = totalSuppliedQuantity;
        this.totalAmount = totalAmount;
        this.paidAmount = paidAmount;
        this.debtAmount = debtAmount;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public long getTotalSuppliedQuantity() {
        return totalSuppliedQuantity;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public double getPaidAmount() {
        return paidAmount;
    }

    public double getDebtAmount() {
        return debtAmount;
    }
}
