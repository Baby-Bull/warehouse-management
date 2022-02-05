package com.sapo.storemanagement.entities;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class VariantsImportReceiptId implements Serializable {
    private static final long serialVersionUID = -335613539868123076L;

    @Column(name = "variant_id", nullable = false)
    private Long variantId;

    @Column(name = "import_receipt_id", nullable = false)
    private Long importReceiptId;

    public VariantsImportReceiptId() {
    }

    public VariantsImportReceiptId(Long variantId, Long importReceiptId) {
        this.variantId = variantId;
        this.importReceiptId = importReceiptId;
    }

    public Long getImportReceiptId() {
        return importReceiptId;
    }

    public void setImportReceiptId(Long importReceiptId) {
        this.importReceiptId = importReceiptId;
    }

    public Long getVariantId() {
        return variantId;
    }

    public void setVariantId(Long variantId) {
        this.variantId = variantId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(importReceiptId, variantId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        VariantsImportReceiptId entity = (VariantsImportReceiptId) o;
        return Objects.equals(this.importReceiptId, entity.importReceiptId) &&
            Objects.equals(this.variantId, entity.variantId);
    }
}