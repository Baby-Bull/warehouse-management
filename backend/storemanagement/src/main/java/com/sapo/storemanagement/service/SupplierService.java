package com.sapo.storemanagement.service;

import com.sapo.storemanagement.entities.Order;
import com.sapo.storemanagement.entities.Supplier;

import java.util.List;
import java.util.Optional;

public interface SupplierService {

    Iterable<Supplier> listAllSuppliers();

    Iterable<Supplier> listAllSuppliersByRecordStatus();

    Supplier getSupplierById(Long id);

    Supplier saveSupplier(Supplier supplier);

    Supplier updateSupplier(long id, Supplier supplier);

    String deleteSupplier(Long id);

    Supplier decreaseDebt(long supplierId, double offset);

    Supplier increaseDebt(long supplierId, double offset);

    List<Order> findAllSuppliedOrders(long supplierId);
}
