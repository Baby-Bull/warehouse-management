package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Product;
import com.sapo.storemanagement.entities.Variant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VariantRepository extends JpaRepository<Variant, Long> {
    Optional<Variant> findByCode(String code);

    boolean existsByCode(String code);

    @Query(
        value = "SELECT * FROM variants WHERE product_id = :product_id AND record_status like 'Đang hoạt động'",
        nativeQuery = true
    )
    List<Variant> findAllByProductId(@Param("product_id") Long id);

    @Query(value = "select * from variants where record_status like :record_status ", nativeQuery = true)
    List<Variant> findAllByRecordStatus(@Param("record_status") String recordStatus);
}