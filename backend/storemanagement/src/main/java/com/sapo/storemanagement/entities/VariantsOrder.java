package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "variants_orders", indexes = {
    @Index(name = "variant_id", columnList = "variant_id")
})
public class VariantsOrder {
    @EmbeddedId
    private VariantsOrderId id;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @MapsId("variantId")
    @JoinColumn(name = "variant_id")
    private Variant variant;

    @Column(name = "supplied_quantity", nullable = false)
    @NotNull(message = "Hãy nhập số lượng nhập của sản phẩm")
    @Min(value = 0, message = "số lượng nhập của sản phẩm không được nhỏ hơn {value}")
    private Long suppliedQuantity;

    @Column(name = "price", columnDefinition = "DECIMAL(12,2) DEFAULT 0.0")
    @NotNull(message = "Hãy nhập giá nhập hàng cho 1 đơn vị sản phẩm")
    @Min(value = 0, message = "Giá nhập hàng cho 1 đơn vị sản phẩm không được nhỏ hơn {value}")
    private Double price = 0.0;

    public VariantsOrder() {
    }

    public VariantsOrder(Order order, Variant variant, long suppliedQuantity, double price) {
        this.id = new VariantsOrderId(order.getId(), variant.getId());
        this.order = order;
        this.variant = variant;
        this.suppliedQuantity = suppliedQuantity;
        this.price = price;
    }

    public VariantsOrderId getId() {
        return id;
    }

    public Order getOrder() {
        return order;
    }

    public Variant getVariant() {
        return variant;
    }

    public Long getSuppliedQuantity() {
        return suppliedQuantity;
    }

    public void setSuppliedQuantity(Long suppliedQuantity) {
        this.suppliedQuantity = suppliedQuantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}