package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.VariantsImportReceipt;
import com.sapo.storemanagement.entities.VariantsImportReceiptId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VariantsImportReceiptRepository extends JpaRepository<VariantsImportReceipt, VariantsImportReceiptId> {
    @Query(
        value = "SELECT COALESCE(SUM(quantity), 0) FROM variants_import_receipts " +
            "JOIN import_receipts ON (import_receipt_id = import_receipts.id) " +
            "JOIN orders ON (order_id = orders.id) " +
            "WHERE order_id = :orderId and variant_id = :variantId",
        nativeQuery = true
    )
    long totalImportedQuantityOfVariantInOrder(@Param("variantId") long variantId, @Param("orderId") long orderId);

    List<VariantsImportReceipt> findAllByImportReceipt_Id(Long importReceiptId);
}