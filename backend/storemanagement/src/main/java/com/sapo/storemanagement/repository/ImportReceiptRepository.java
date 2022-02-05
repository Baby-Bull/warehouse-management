package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.ImportReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImportReceiptRepository extends JpaRepository<ImportReceipt, Long> {
    Optional<ImportReceipt> findByCode(String code);

    boolean existsByCode(String code);

    List<ImportReceipt> findAllByOrder_Id(long orderId);
}