package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.entities.Order;
import com.sapo.storemanagement.entities.RecordStatus;
import com.sapo.storemanagement.entities.Supplier;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.exception.UniqueKeyConstraintException;
import com.sapo.storemanagement.repository.OrderRepository;
import com.sapo.storemanagement.repository.SupplierRepository;
import com.sapo.storemanagement.service.SupplierService;
import com.sapo.storemanagement.utils.itemcodegenerator.ItemCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    @Qualifier("supplier-code-generator")
    private ItemCodeGenerator supplierCodeGenerator;

    @Override
    public Iterable<Supplier> listAllSuppliers() {
        return supplierRepository.findAll();
    }

    @Override
    public Iterable<Supplier> listAllSuppliersByRecordStatus() {
        return supplierRepository.findByRecordStatus(RecordStatus.ACTIVE.getStatus());
    }

    @Override
    public Supplier getSupplierById(Long id) {
        if (id <= 0) {
            throw new BadNumberException("Id phải lớn hơn 0");
        }

        return supplierRepository
                .findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Nhà cung cấp không tồn tại"));
    }

    @Override
    @Transactional
    public Supplier saveSupplier(Supplier supplier) {
        String supplierCode = supplier.getCode();
        if(supplierCode.isBlank()) {
            supplierCode = supplierCodeGenerator.generate();
            supplier.setCode(supplierCode);
        }

        if (supplierRepository.existsByCode(supplierCode)) {
            throw new UniqueKeyConstraintException("Mã nhà cung cấp đã tồn tại");
        }
        return supplierRepository.save(supplier);
    }

    @Override
    @Transactional
    public Supplier updateSupplier(long id, Supplier supplier) {
        if (id <= 0) {
            throw new BadNumberException("Id phải lớn hơn 0");
        }
        Supplier existingSupplier = this.getSupplierById(id);

        if (supplierRepository.existsByCode(supplier.getCode()) &&
            !existingSupplier.getCode().equals(supplier.getCode())) {
            throw new UniqueKeyConstraintException("Mã nhà cung cấp đã tồn tại");
        }

        existingSupplier.setAddress(supplier.getAddress());
        existingSupplier.setCode(supplier.getCode());
        existingSupplier.setDescription(supplier.getDescription());
        existingSupplier.setEmail(supplier.getEmail());
        existingSupplier.setFax(supplier.getFax());
        existingSupplier.setName(supplier.getName());
        existingSupplier.setPhone(supplier.getPhone());
        existingSupplier.setWebsite(supplier.getWebsite());

        return supplierRepository.save(existingSupplier);

    }

    @Override
    @Transactional
    public String deleteSupplier(Long id) {
        if (id <= 0) {
            throw new BadNumberException("Id phải lớn hơn 0");
        }

        Supplier supplier = this.getSupplierById(id);
        supplier.setRecordStatus(RecordStatus.DELETED);
        supplierRepository.save(supplier);

        return "delete supplier successful !!!";
    }

    @Override
    @Transactional
    public Supplier decreaseDebt(long supplierId, double offset) {
        if (offset < 0) {
            throw new BadNumberException("Số tiền không được âm");
        }

        Supplier supplier = this.getSupplierById(supplierId);
        supplier.setDebt(supplier.getDebt() - offset);

        return supplier;
    }

    @Override
    public Supplier increaseDebt(long supplierId, double offset) {
        if (offset < 0) {
            throw new BadNumberException("Số tiền không được âm");
        }

        Supplier supplier = this.getSupplierById(supplierId);
        supplier.setDebt(supplier.getDebt() + offset);

        return supplier;
    }

    @Override
    public List<Order> findAllSuppliedOrders(long supplierId) {
        if(supplierId < 0) {
            throw new BadNumberException("Số tiền không được âm");
        }
        return orderRepository.findAllOrdersBySupplierId(supplierId);
    }
}
