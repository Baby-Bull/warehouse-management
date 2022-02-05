package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    boolean existsByCode(String code);

    @Query(value = "select * from suppliers where record_status like :record_status ", nativeQuery = true)
    Iterable<Supplier> findByRecordStatus(@Param("record_status") String record_status);
}