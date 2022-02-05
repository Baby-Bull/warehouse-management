package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
//    boolean existsByCode(String code);

    @Query(value = "select * from products where record_status like :record_status ", nativeQuery = true)
    List<Product> findAllByRecordStatus(@Param("record_status") String recordStatus);

    @Modifying
    @Query(
        value = "update products p1 set record_status = 'Đã xóa'" +
            " where 0 = (select sum(if(v.record_status like 'Đang hoạt động', 1, 0))" +
            " from variants v right join products p2 on (product_id = p2.id) where p2.id = p1.id)" +
            " and p1.id = :productId",
        nativeQuery = true
    )
    void deleteProductIfNoVariantAvailable(@Param("productId") Long productId);

    @Query(
        value = "select coalesce(sum(inventory_quantity), 0) " +
            "from products left join variants on (products.id = variants.product_id) " +
            "where products.id = :productId",
        nativeQuery = true
    )
    long totalInventoryQuantityOfProduct(@Param("productId") long productId);
}