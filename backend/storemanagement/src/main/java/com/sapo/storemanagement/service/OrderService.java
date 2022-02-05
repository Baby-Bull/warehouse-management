package com.sapo.storemanagement.service;

import com.sapo.storemanagement.dto.OrderDto;
import com.sapo.storemanagement.entities.Order;
import com.sapo.storemanagement.entities.VariantsOrder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderService {

    List<Order> getAllOrder();

    Order getOrderById(long id);

    @Transactional
    Order createdOrder(Long orderCreatorId, OrderDto orderDto);

    @Transactional
    Order updateOrder(long id, OrderDto orderDto );

    @Transactional
    Order increasePaidAmount(long orderId, double offset);

    List<VariantsOrder> findAllVariantInOrder(long id);

    void cancelOrder(long id);
}
