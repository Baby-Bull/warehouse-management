package com.sapo.storemanagement.entities;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class VariantsOrderId implements Serializable {
    private static final long serialVersionUID = -5671855994402133031L;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "variant_id", nullable = false)
    private Long variantId;

    public VariantsOrderId() {
    }

    public VariantsOrderId(Long orderId, Long variantId) {
        this.orderId = orderId;
        this.variantId = variantId;
    }

    public Long getVariantId() {
        return variantId;
    }

    public void setVariantId(Long variantId) {
        this.variantId = variantId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, variantId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        VariantsOrderId entity = (VariantsOrderId) o;
        return Objects.equals(this.orderId, entity.orderId) &&
            Objects.equals(this.variantId, entity.variantId);
    }
}