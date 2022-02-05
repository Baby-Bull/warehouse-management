package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.dto.*;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.service.ImportReceiptService;
import com.sapo.storemanagement.service.OrderService;
import com.sapo.storemanagement.service.PaymentInvoiceService;
import com.sapo.storemanagement.service.ReturnReceiptService;
import com.sapo.storemanagement.utils.RequestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {
    private final OrderService orderService;

    @Autowired
    private PaymentInvoiceService paymentInvoiceService;

    @Autowired
    private ImportReceiptService importReceiptService;

    @Autowired
    private ReturnReceiptService returnReceiptService;

    @Autowired
    private RequestUtils requestUtils;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Lấy thông tin order theo orderId
    @GetMapping("/{id}")
    public Order findOrderById(@PathVariable long id){
        return orderService.getOrderById(id);
    }

    // Lấy danh sách Order
    @GetMapping
    public List<Order> findAllOrder(){
        return orderService.getAllOrder();
    }

    // Tạo mới một order
    @PostMapping
    public Order createOrder(HttpServletRequest servletRequest, @RequestBody @Valid OrderDto orderDto){
        Long orderCreatorId = requestUtils.getUserIdFromRequest(servletRequest);
        return orderService.createdOrder(orderCreatorId, orderDto);
    }

    // Chỉnh sửa thông tin order
    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable long id, @RequestBody @Valid OrderDto orderDto){
        return orderService.updateOrder(id, orderDto);
    }

    @DeleteMapping("/{id}")
    public void cancelOrder(@PathVariable long id){
        orderService.cancelOrder(id);
    }

    // lấy tất cả các variant thuộc cùng 1 orderId
    @GetMapping("/{id}/variants")
    public List<VariantsOrder> findAllVariantInOrder(@PathVariable long id) {
        return orderService.findAllVariantInOrder(id);
    }

    // Thanh toán
    @PostMapping("/{orderId}/payment-invoices")
    public PaymentInvoice payOrder(HttpServletRequest servletRequest, @PathVariable long orderId, @RequestBody @Valid PayOrderDto payOrderDto) {
        Long invoiceCreatorId = requestUtils.getUserIdFromRequest(servletRequest);
        return paymentInvoiceService.savePaymentInvoice(invoiceCreatorId, orderId, payOrderDto);
    }

    // History thanh toán
    @GetMapping("/{orderId}/payment-invoices")
    public List<PaymentInvoice> findAllPaymentInvoicesOfOrder(@PathVariable long orderId) {
        return paymentInvoiceService.listAllPaymentInvoicesByOrder(orderId);
    }

    // Nhập kho
    @PostMapping("/{orderId}/import-receipts")
    public ImportReceipt importOrder(HttpServletRequest servletRequest, @PathVariable long orderId, @RequestBody @Valid ImportReceiptDto importReceiptDto) {
        Long creatorId = requestUtils.getUserIdFromRequest(servletRequest);
        return importReceiptService.saveImportReceipt(creatorId, orderId, importReceiptDto);
    }

    // History nhập kho
    @GetMapping("/{orderId}/import-receipts")
    public List<ImportReceiptResponseDto> findAllImportReceiptsOfOrder(@PathVariable long orderId) {
        return importReceiptService.listAllImportReceiptsByOrder(orderId);
    }

    // Hoàn hàng
    @PostMapping("/{orderId}/return-receipts")
    public ReturnReceipt returnOrder(HttpServletRequest servletRequest, @PathVariable long orderId, @RequestBody @Valid ReturnReceiptDto returnReceiptDto) {
        Long creatorId = requestUtils.getUserIdFromRequest(servletRequest);
        return returnReceiptService.saveReturnReceipt(creatorId, orderId, returnReceiptDto);
    }

    // History Hoàn hàng
    @GetMapping("/{orderId}/return-receipts")
    public List<ReturnReceiptResponseDto> findAllReturnReceiptsOfOrder(@PathVariable long orderId) {
        return returnReceiptService.listAllReturnReceiptsByOrder(orderId);
    }
}
// @Valid put