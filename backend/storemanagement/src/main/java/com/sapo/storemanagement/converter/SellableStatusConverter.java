package com.sapo.storemanagement.converter;

import com.sapo.storemanagement.entities.SellableStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class SellableStatusConverter implements AttributeConverter<SellableStatus, String> {

    @Override
    public String convertToDatabaseColumn(SellableStatus attribute) {
        if(attribute == null) {
            return null;
        }
        return attribute.getStatus();
    }

    @Override
    public SellableStatus convertToEntityAttribute(String dbData) {
        if(dbData == null) {
            return null;
        }
        return Stream.of(SellableStatus.values())
            .filter(recordStatus -> recordStatus.getStatus().equals(dbData))
            .findFirst()
            .orElseThrow(IllegalArgumentException::new);
    }
}
