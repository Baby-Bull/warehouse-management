package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Supplier;
import com.sapo.storemanagement.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Query(value = "select * from users where record_status like :record_status ", nativeQuery = true)
    Iterable<User> findByRecordStatus(@Param("record_status") String record_status);
}