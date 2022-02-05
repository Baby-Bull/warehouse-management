package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByCode(String code);

    @Query(
            value = "SELECT * FROM orders WHERE supplier_id = :supplierId",
            nativeQuery = true
    )
    List<Order> findAllOrdersBySupplierId(@Param("supplierId") long supplierId);

    @Query(
            value = "select coalesce(count(id), 0) from orders where month(created_at) = :month and year(created_at) = :year",
            nativeQuery = true
    )
    long countOrdersInMonthInYear(@Param("month") int month, @Param("year") int year);

    @Query(
            value = "select coalesce(sum(total_amount), 0) from orders where month(created_at) = :month and year(created_at) = :year",
            nativeQuery = true
    )
    double totalAmountInMonthInYear(@Param("month") int month, @Param("year") int year);

    @Query(
            value = "select coalesce(sum(amount), 0) from payment_invoice where month(created_at) = :month and year(created_at) = :year",
            nativeQuery = true
    )
    double paidAmountInMonthInYear(@Param("month") int month, @Param("year") int year);
}