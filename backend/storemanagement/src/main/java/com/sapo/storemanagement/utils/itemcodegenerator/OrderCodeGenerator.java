package com.sapo.storemanagement.utils.itemcodegenerator;

import com.sapo.storemanagement.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component("order-code-generator")
public class OrderCodeGenerator extends ItemCodeGenerator {
    @Autowired
    private OrderRepository orderRepository;

    @Override
    protected String getPrefix() {
        return "SON";
    }

    @Override
    protected long countRecords() {
        return orderRepository.count();
    }
}
