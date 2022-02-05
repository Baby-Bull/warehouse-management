package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.CheckSheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CheckSheetRepository extends JpaRepository<CheckSheet, Long> {
    Optional<CheckSheet> findByCode(String code);
}