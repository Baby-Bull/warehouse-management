package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders", indexes = {
        @Index(name = "orders_code_unique", columnList = "code", unique = true)
})
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "code", nullable = false, unique = true, length = 8)
    @NotBlank(message = "Không được để trống mã đơn nhập hàng")
    @Size(max = 8, message = "Độ dài mã đơn nhập hàng không được vượt quá {max} kí tự")
    private String code;

    @ManyToOne(optional = false)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @Column(name = "total_amount", nullable = false)
    @NotNull(message = "Tổng tiền của đơn hàng không được null")
    @Min(value = 0, message = "Tổng tiền đơn hàng không được nhở hơn {value}")
    private Double totalAmount = 0.0;

    @Column(name="discount", nullable = false)
    @Min(value = 0, message = "Chiết khấu không được nhỏ hơn {value}")
    private Double discount;

    @Column(name = "paid_amount")
    @NotNull(message = "Số tiền đã trả của đơn hàng không được null")
    @Min(value = 0, message = "Số tiền đã trả của đơn hàng không được nhỏ hơn {value}")
    private Double paidAmount = 0.0;

    @Column(name = "description", columnDefinition = "varchar(255) DEFAULT ''")
    @NotNull(message = "Mô tả đơn hàng không được null")
    @Size(max = 255, message = "Độ dài mô tả đơn hàng không được vượt quá {max} kí tự")
    private String description;

    @Column(name = "expected_time", nullable = false)
    private LocalDate expectedTime;

    @Column(name = "status", length = 32)
    private OrderStatus status = OrderStatus.PROCESSING;

    @Column(name = "transaction_status", length = 32)
    private TransactionStatus transactionStatus = TransactionStatus.UNPAID;

    @Column(name = "imported_status", length = 32)
    private ImportedStatus importedStatus = ImportedStatus.AWAITING;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @ManyToOne(optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    public Order() {
    }

    public Order(String code, Supplier supplier, String description,
                 LocalDate expectedTime, Double discount, User createdBy) {
        this.code = code;
        this.supplier = supplier;
        this.description = description;
        this.expectedTime = expectedTime;
        this.discount = discount;
        this.createdBy = createdBy;
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(double paidAmount) {
        this.paidAmount = paidAmount;
        if(this.paidAmount < this.totalAmount) {
            this.setTransactionStatus(TransactionStatus.PARTIAL_PAID);
        }
        else {
            this.setTransactionStatus(TransactionStatus.PAID);
        }
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public LocalDate getExpectedTime() {
        return expectedTime;
    }

    public void setExpectedTime(LocalDate expectedTime) {
        this.expectedTime = expectedTime;
    }

    public String getStatus() {
        return status.getStatus();
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getTransactionStatus() {
        return transactionStatus.getStatus();
    }

    public void setTransactionStatus(TransactionStatus transactionStatus) {
        this.transactionStatus = transactionStatus;
    }

    public String getImportedStatus() {
        return importedStatus.getStatus();
    }

    public void setImportedStatus(ImportedStatus importedStatus) {
        this.importedStatus = importedStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getCreatedBy() {
        return createdBy;
    }
}
