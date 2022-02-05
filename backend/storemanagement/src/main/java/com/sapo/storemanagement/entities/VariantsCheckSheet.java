package com.sapo.storemanagement.entities;

import javax.persistence.*;

@Entity
@Table(name = "variants_check_sheets", indexes = {
    @Index(name = "checksheet_id", columnList = "checksheet_id")
})
public class VariantsCheckSheet {
    @EmbeddedId
    private VariantsCheckSheetId id;

    @ManyToOne
    @MapsId("variantId")
    @JoinColumn(name = "variant_id")
    private Variant variant;

    @ManyToOne
    @MapsId("checksheetId")
    @JoinColumn(name = "checksheet_id")
    private CheckSheet checkSheet;

    @Column(name = "inventory_quantity", nullable = false)
    private Long inventoryQuantity;

    @Column(name = "real_quantity", nullable = false)
    private Long realQuantity;

    @Column(name = "note")
    private String note = "";

    public VariantsCheckSheet() {
    }

    public VariantsCheckSheet(long variantId, long checksheetId, long inventoryQuantity, long realQuantity) {
        this.id = new VariantsCheckSheetId(variantId, checksheetId);
        this.inventoryQuantity = inventoryQuantity;
        this.realQuantity = realQuantity;
    }

    public VariantsCheckSheet(long variantId, long checksheetId,
                              long inventoryQuantity, long realQuantity,
                              String note) {
        this.id = new VariantsCheckSheetId(variantId, checksheetId);
        this.inventoryQuantity = inventoryQuantity;
        this.realQuantity = realQuantity;
        this.note = note;
    }

    public VariantsCheckSheetId getId() {
        return id;
    }

    public Variant getVariant() {
        return variant;
    }

    public CheckSheet getCheckSheet() {
        return checkSheet;
    }

    public Long getInventoryQuantity() {
        return inventoryQuantity;
    }

    public Long getRealQuantity() {
        return realQuantity;
    }

    public void setRealQuantity(Long realQuantity) {
        this.realQuantity = realQuantity;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}