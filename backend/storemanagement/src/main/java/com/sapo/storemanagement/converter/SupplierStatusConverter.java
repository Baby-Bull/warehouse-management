package com.sapo.storemanagement.converter;

import com.sapo.storemanagement.entities.RecordStatus;
import com.sapo.storemanagement.entities.SupplierStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class SupplierStatusConverter implements AttributeConverter<SupplierStatus, String> {

    @Override
    public String convertToDatabaseColumn(SupplierStatus attribute) {
        if(attribute == null) {
            return null;
        }
        return attribute.getStatus();
    }

    @Override
    public SupplierStatus convertToEntityAttribute(String dbData) {
        if(dbData == null) {
            return null;
        }
        return Stream.of(SupplierStatus.values())
            .filter(supplierStatus -> supplierStatus.getStatus().equals(dbData))
            .findFirst()
            .orElseThrow(IllegalArgumentException::new);
    }
}
