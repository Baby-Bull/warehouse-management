package com.sapo.storemanagement.entities;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class VariantsReturnReceiptId implements Serializable {
    private static final long serialVersionUID = 1453011470561823497L;

    @Column(name = "variant_id", nullable = false)
    private Long variantId;

    @Column(name = "return_receipt_id", nullable = false)
    private Integer returnReceiptId;

    public VariantsReturnReceiptId() {
    }

    public VariantsReturnReceiptId(Long variantId, Integer returnReceiptId) {
        this.variantId = variantId;
        this.returnReceiptId = returnReceiptId;
    }

    public Integer getReturnReceiptId() {
        return returnReceiptId;
    }

    public void setReturnReceiptId(Integer returnReceiptId) {
        this.returnReceiptId = returnReceiptId;
    }

    public Long getVariantId() {
        return variantId;
    }

    public void setVariantId(Long variantId) {
        this.variantId = variantId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(variantId, returnReceiptId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        VariantsReturnReceiptId entity = (VariantsReturnReceiptId) o;
        return Objects.equals(this.variantId, entity.variantId) &&
            Objects.equals(this.returnReceiptId, entity.returnReceiptId);
    }
}