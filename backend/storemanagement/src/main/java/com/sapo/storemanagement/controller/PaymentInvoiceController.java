package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.entities.PaymentInvoice;
import com.sapo.storemanagement.service.PaymentInvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/payment-invoices")
@CrossOrigin
public class PaymentInvoiceController {
    private final PaymentInvoiceService paymentInvoiceService;

    @Autowired
    public PaymentInvoiceController(PaymentInvoiceService paymentInvoiceService) {
        this.paymentInvoiceService = paymentInvoiceService;
    }

    @GetMapping("/{id}")
    public PaymentInvoice findPaymentInvoiceById(@PathVariable long id){
        return paymentInvoiceService.getPaymentInvoiceById(id);
    }

    @GetMapping
    public List<PaymentInvoice> findAllPaymentInvoices(){
        return paymentInvoiceService.listAllPaymentInvoices();
    }
}
