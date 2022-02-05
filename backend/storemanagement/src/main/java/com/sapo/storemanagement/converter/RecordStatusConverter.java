package com.sapo.storemanagement.converter;

import com.sapo.storemanagement.entities.RecordStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class RecordStatusConverter implements AttributeConverter<RecordStatus, String> {

    @Override
    public String convertToDatabaseColumn(RecordStatus attribute) {
        if(attribute == null) {
            return null;
        }
        return attribute.getStatus();
    }

    @Override
    public RecordStatus convertToEntityAttribute(String dbData) {
        if(dbData == null) {
            return null;
        }
        return Stream.of(RecordStatus.values())
            .filter(recordStatus -> recordStatus.getStatus().equals(dbData))
            .findFirst()
            .orElseThrow(IllegalArgumentException::new);
    }
}
