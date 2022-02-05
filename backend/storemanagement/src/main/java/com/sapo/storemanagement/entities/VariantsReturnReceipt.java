package com.sapo.storemanagement.entities;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "variants_return_receipts", indexes = {
    @Index(name = "fk_variants_return_receipts_2_idx", columnList = "return_receipt_id")
})
public class VariantsReturnReceipt {
    @EmbeddedId
    private VariantsReturnReceiptId id;

    @ManyToOne
    @MapsId("variantId")
    @JoinColumn(name = "variant_id")
    private Variant variant;

    @ManyToOne
    @MapsId("returnReceiptId")
    @JoinColumn(name = "return_receipt_id")
    private ReturnReceipt returnReceipt;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "amount_each", precision = 12, scale = 2)
    private Double amountEach;

    public VariantsReturnReceipt() {
    }

    public VariantsReturnReceipt(Variant variant, ReturnReceipt returnReceipt, Long quantity, Double amountEach) {
        this.variant = variant;
        this.returnReceipt = returnReceipt;
        this.id = new VariantsReturnReceiptId(variant.getId(), returnReceipt.getId());
        this.quantity = quantity;
        this.amountEach = amountEach;
    }

    public Variant getVariant() {
        return variant;
    }

    public ReturnReceipt getReturnReceipt() {
        return returnReceipt;
    }

    public Double getAmountEach() {
        return amountEach;
    }

    public void setAmountEach(Double amountEach) {
        this.amountEach = amountEach;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public VariantsReturnReceiptId getId() {
        return id;
    }
}