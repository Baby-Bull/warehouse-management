package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.PaymentInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentInvoiceRepository extends JpaRepository<PaymentInvoice, Long> {
    List<PaymentInvoice> findAllByOrder_Id(long orderId);
}