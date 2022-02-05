package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.LineItemDto;
import com.sapo.storemanagement.dto.OrderDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.repository.OrderRepository;
import com.sapo.storemanagement.repository.UserRepository;
import com.sapo.storemanagement.repository.VariantsOrderRepository;
import com.sapo.storemanagement.service.OrderService;
import com.sapo.storemanagement.service.SupplierService;
import com.sapo.storemanagement.service.VariantService;
import com.sapo.storemanagement.utils.itemcodegenerator.ItemCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    @Autowired
    private SupplierService supplierService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VariantService variantService;

    @Autowired
    private VariantsOrderRepository variantsOrderRepository;

    @Autowired
    @Qualifier("order-code-generator")
    private ItemCodeGenerator orderCodeGenerator;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // lay danh sach tat ca don nhap hang
    @Override
    public List<Order> getAllOrder() {
        return orderRepository.findAll();
    }

    // lay thong tin don nhap hang theo id
    @Override
    public Order getOrderById(long id) {
        if(id <= 0) {
            throw new BadNumberException("Id phải lớn hơn 0");
        }
        return orderRepository
            .findById(id)
            .orElseThrow(() -> new RecordNotFoundException("Đơn nhâp hàng " + id + " không tồn tại"));
    }

    // luu thong tin 1 don nhap hang
    @Override
    @Transactional
    public Order createdOrder(Long orderCreatorId, OrderDto orderDto) {
        String orderCode = orderDto.getOrderCode();
        if(orderCode == null || orderCode.isBlank()) {
            orderCode = orderCodeGenerator.generate();
        }
        Double discount = (100- orderDto.getDiscount()) / 100;

        Supplier supplier = supplierService.getSupplierById(orderDto.getSupplierId());
        User user = userService.getUserById(orderCreatorId);
        Order newOrder = orderRepository.save(new Order(
            orderCode,
            supplier,
            orderDto.getDescription(),
            orderDto.getDeliveryTime(),
            orderDto.getDiscount(),
            user
        ));
        orderDto.getLineItems().forEach(item -> {
            Variant variant = variantService.getVariantById(item.getVariantId());
            VariantsOrder variantsOrder = new VariantsOrder(
                newOrder,
                variant,
                item.getQuantity(),
                item.getPrice()
            );

            variantsOrderRepository.save(variantsOrder);
            newOrder.setTotalAmount(newOrder.getTotalAmount() + item.getPrice()*item.getQuantity());
        } );
        newOrder.setTotalAmount(newOrder.getTotalAmount() * discount);
        supplierService.increaseDebt(newOrder.getSupplier().getId(), newOrder.getTotalAmount());
        return newOrder;
    }

    // cap nhat thong tin 1 don nhap hang
    @Override
    @Transactional
    public Order updateOrder(long id, OrderDto newOrderDto) {
        Order orderUpdate = this.getOrderById(id);
        double oldTotalAmount = orderUpdate.getTotalAmount();

        double oldDiscount = (100 - orderUpdate.getDiscount()) /100;
        double newDiscount = (100 - newOrderDto.getDiscount()) / 100;

        if(orderUpdate.getStatus().equals("Đang giao dịch")) {
            List<LineItemDto> newVariantOrders = newOrderDto.getLineItems();
            List<VariantsOrder> variantsOrderUpdates = variantsOrderRepository.findVariantByOrderId(orderUpdate.getId());

        // Xoá đi sản phẩm cũ ko nằm trong danh sách mới và cập nhật các sản phầm
            variantsOrderUpdates.forEach(oldVariant -> {
                AtomicBoolean check = new AtomicBoolean(false);
                newVariantOrders.forEach(newVariant -> {
                    if(newVariant.getVariantId().equals(oldVariant.getVariant().getId())){
                        orderUpdate.setTotalAmount(orderUpdate.getTotalAmount() - (oldVariant.getPrice() * oldVariant.getSuppliedQuantity() * oldDiscount) + (newVariant.getPrice() * newVariant.getQuantity() * newDiscount));
                        oldVariant.setPrice(newVariant.getPrice());
                        oldVariant.setSuppliedQuantity(newVariant.getQuantity());

                        variantsOrderRepository.save(oldVariant);
                        check.set(true);
                    }
                });
                if(!check.get()){
                    orderUpdate.setTotalAmount(orderUpdate.getTotalAmount() - (oldVariant.getPrice() * oldVariant.getSuppliedQuantity() * oldDiscount));
                    variantsOrderRepository.deleteVariantOderInOrder(oldVariant.getOrder().getId(), oldVariant.getVariant().getId());
                }
            });

         // thêm sản phẩm mới chưa có trong danh sách cũ
            List<VariantsOrder> variantOrderUpdating = variantsOrderRepository.findVariantByOrderId(orderUpdate.getId());
            newVariantOrders.forEach(newVariant -> {
                // kiểm tra đã tồn tại hay chưa
                AtomicBoolean check = new AtomicBoolean(false);
                variantOrderUpdating.forEach(oldVariant -> {
                    if(newVariant.getVariantId().equals(oldVariant.getVariant().getId())){
                        check.set(true);
                    }
                });

                if(!check.get()){
                    orderUpdate.setTotalAmount(orderUpdate.getTotalAmount() + (newVariant.getPrice() * newVariant.getQuantity() * newDiscount));
                    Variant variant = variantService.getVariantById(newVariant.getVariantId());
                    VariantsOrder variantsOrderAdd = new VariantsOrder(
                            orderUpdate,
                            variant,
                            newVariant.getQuantity(),
                            newVariant.getPrice()
                    );
                    variantsOrderRepository.save(variantsOrderAdd);
                }
            });


            double newTotalAmount = orderUpdate.getTotalAmount();
            if(newTotalAmount < 0) {
                throw new BadNumberException("Tổng tiền không hợp lệ");
            }
            if(oldTotalAmount < newTotalAmount){
                supplierService.increaseDebt(orderUpdate.getSupplier().getId(), (newTotalAmount - oldTotalAmount));
            } else if(oldTotalAmount > newTotalAmount) {
                supplierService.decreaseDebt(orderUpdate.getSupplier().getId(), (oldTotalAmount - newTotalAmount));
            }

            orderUpdate.setExpectedTime(newOrderDto.getDeliveryTime());
            orderUpdate.setDescription(newOrderDto.getDescription());
            orderUpdate.setUpdatedAt(LocalDateTime.now());
        }
        orderRepository.save(orderUpdate);
        return orderUpdate;
    }

    @Override
    @Transactional
    public Order increasePaidAmount(long orderId, double offset) {
        if(offset < 0) {
            throw new BadNumberException("Không được trả số tiền âm");
        }

        Order order = this.getOrderById(orderId);
        if(order.getStatus().equals(OrderStatus.COMPLETE.getStatus())) {
            throw new IllegalStateException("Không thể thao tác với đơn hàng với trạng thái hoàn thành");
        }
        if(order.getTransactionStatus().equals(TransactionStatus.PAID.getStatus())) {
            throw new IllegalStateException("Đơn hàng này đã được trả tiền toàn bộ");
        }

        order.setPaidAmount(order.getPaidAmount() + offset);
        if(order.getTransactionStatus().equals(TransactionStatus.PAID.getStatus()) &&
            order.getImportedStatus().equals(ImportedStatus.IMPORTED.getStatus())) {
            order.setStatus(OrderStatus.COMPLETE);
        }
        return order;
    }

    @Override
    public List<VariantsOrder> findAllVariantInOrder(long id) {
        return variantsOrderRepository.findVariantByOrderId(id);
    }

    @Override
    public void cancelOrder(long id) {
        Order order = getOrderById(id);
        supplierService.decreaseDebt(order.getSupplier().getId(), order.getTotalAmount());
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
}
