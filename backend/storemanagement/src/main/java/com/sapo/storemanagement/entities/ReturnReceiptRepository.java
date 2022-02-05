package com.sapo.storemanagement.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReturnReceiptRepository extends JpaRepository<ReturnReceipt, Integer> {
    Optional<ReturnReceipt> findByCode(String code);

    boolean existsByCode(String code);

    List<ReturnReceipt> findAllByOrder_Id(long orderId);
}