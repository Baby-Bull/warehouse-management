package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.PayOrderDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.ForeignKeyConstraintException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.repository.OrderRepository;
import com.sapo.storemanagement.repository.PaymentInvoiceRepository;
import com.sapo.storemanagement.repository.SupplierRepository;
import com.sapo.storemanagement.repository.UserRepository;
import com.sapo.storemanagement.service.OrderService;
import com.sapo.storemanagement.service.PaymentInvoiceService;
import com.sapo.storemanagement.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PaymentInvoiceServiceImpl implements PaymentInvoiceService {
    private final PaymentInvoiceRepository paymentInvoiceRepository;

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    public PaymentInvoiceServiceImpl(PaymentInvoiceRepository paymentInvoiceRepository, OrderRepository orderRepository) {
        this.paymentInvoiceRepository = paymentInvoiceRepository;
    }

    @Override
    public List<PaymentInvoice> listAllPaymentInvoices() {
        return this.paymentInvoiceRepository.findAll();
    }

    @Override
    public PaymentInvoice getPaymentInvoiceById(long id) {
        if(id <= 0) {
            throw new BadNumberException("Id phải lớn hơn 0");
        }

        return paymentInvoiceRepository
            .findById(id)
            .orElseThrow(() -> new RecordNotFoundException("Không tìm thấy hóa đơn có id " + id));
    }

    @Override
    @Transactional
    public PaymentInvoice savePaymentInvoice(long invoiceCreatorId, long orderId, PayOrderDto payOrderDto) {
        User user = userService.getUserById(invoiceCreatorId);

        Order order = orderService.increasePaidAmount(orderId, payOrderDto.getAmount());
        Supplier supplier = supplierService.decreaseDebt(order.getSupplier().getId(), payOrderDto.getAmount());

        PaymentInvoice paymentInvoice = new PaymentInvoice(payOrderDto.getAmount(), order, user);

        return paymentInvoiceRepository.save(paymentInvoice);
    }

    @Override
    public List<PaymentInvoice> listAllPaymentInvoicesByOrder(long orderId) {
        return paymentInvoiceRepository.findAllByOrder_Id(orderId);
    }
}
