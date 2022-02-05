package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "variants_import_receipts")
public class VariantsImportReceipt {
    @EmbeddedId
    private VariantsImportReceiptId id;

    @Column(name = "quantity", nullable = false)
    @NotNull(message = "Quantity cannot be null")
    private Long quantity;

    @ManyToOne
    @MapsId("importReceiptId")
    @JoinColumn(name = "import_receipt_id")
    private ImportReceipt importReceipt;

    @ManyToOne
    @MapsId("variantId")
    @JoinColumn(name = "variant_id")
    private Variant variant;

    public VariantsImportReceipt() {
    }

    public VariantsImportReceipt(Variant variant, ImportReceipt importReceipt, long quantity) {
        this.variant = variant;
        this.importReceipt = importReceipt;
        this.id = new VariantsImportReceiptId(variant.getId(), importReceipt.getId());
        this.quantity = quantity;
    }

    public VariantsImportReceiptId getId() {
        return id;
    }

    public Variant getVariant() {
        return variant;
    }

    public ImportReceipt getImportReceipt() {
        return importReceipt;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }
}