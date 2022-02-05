package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment_invoice")
public class PaymentInvoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "amount", nullable = false)
    @NotNull(message = "Số tiền thanh toán không được null")
    @Min(value = 0, message = "Số tiền thanh toán không được nhỏ hơn {value}")
    private Double amount;

    @ManyToOne(optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    public PaymentInvoice() {
    }

    public PaymentInvoice(Double amount, Order order, User createdBy) {
        this.amount = amount;
        this.order = order;
        this.createdBy = createdBy;
    }

    public Long getId() {
        return id;
    }

    public Double getAmount() {
        return amount;
    }

    public Order getOrder() {
        return order;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getCreatedBy() {
        return createdBy;
    }
}
