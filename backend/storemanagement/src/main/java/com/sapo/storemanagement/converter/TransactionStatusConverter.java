package com.sapo.storemanagement.converter;

import com.sapo.storemanagement.entities.TransactionStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class TransactionStatusConverter implements AttributeConverter<TransactionStatus, String> {

    @Override
    public String convertToDatabaseColumn(TransactionStatus attribute) {
        if(attribute == null) {
            return null;
        }
        return attribute.getStatus();
    }

    @Override
    public TransactionStatus convertToEntityAttribute(String dbData) {
        if(dbData == null) {
            return null;
        }
        return Stream.of(TransactionStatus.values())
            .filter(recordStatus -> recordStatus.getStatus().equals(dbData))
            .findFirst()
            .orElseThrow(IllegalArgumentException::new);
    }
}