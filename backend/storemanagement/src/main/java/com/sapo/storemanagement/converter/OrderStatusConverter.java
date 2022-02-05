package com.sapo.storemanagement.converter;

import com.sapo.storemanagement.entities.OrderStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class OrderStatusConverter implements AttributeConverter<OrderStatus, String> {

    @Override
    public String convertToDatabaseColumn(OrderStatus attribute) {
        if(attribute == null) {
            return null;
        }
        return attribute.getStatus();
    }

    @Override
    public OrderStatus convertToEntityAttribute(String dbData) {
        if(dbData == null) {
            return null;
        }
        return Stream.of(OrderStatus.values())
            .filter(recordStatus -> recordStatus.getStatus().equals(dbData))
            .findFirst()
            .orElseThrow(IllegalArgumentException::new);
    }
}
