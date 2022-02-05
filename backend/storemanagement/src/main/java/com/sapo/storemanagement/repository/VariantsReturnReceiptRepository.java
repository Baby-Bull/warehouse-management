package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.VariantsReturnReceipt;
import com.sapo.storemanagement.entities.VariantsReturnReceiptId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VariantsReturnReceiptRepository extends JpaRepository<VariantsReturnReceipt, VariantsReturnReceiptId> {
    @Query(
        value = "SELECT COALESCE(SUM(quantity), 0) FROM variants_return_receipts " +
            "JOIN return_receipts ON (return_receipt_id = return_receipts.id) " +
            "JOIN orders ON (order_id = orders.id) " +
            "WHERE order_id = :orderId and variant_id = :variantId",
        nativeQuery = true
    )
    long totalReturnedQuantityOfVariantInOrder(@Param("variantId") long variantId, @Param("orderId") long orderId);

    List<VariantsReturnReceipt> findAllByReturnReceipt_Id(Integer returnReceiptId);
}