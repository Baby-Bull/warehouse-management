package com.sapo.storemanagement.converter;

import com.sapo.storemanagement.entities.ImportedStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class ImportedStatusConverter implements AttributeConverter<ImportedStatus, String> {

    @Override
    public String convertToDatabaseColumn(ImportedStatus attribute) {
        if(attribute == null) {
            return null;
        }
        return attribute.getStatus();
    }

    @Override
    public ImportedStatus convertToEntityAttribute(String dbData) {
        if(dbData == null) {
            return null;
        }
        return Stream.of(ImportedStatus.values())
            .filter(recordStatus -> recordStatus.getStatus().equals(dbData))
            .findFirst()
            .orElseThrow(IllegalArgumentException::new);
    }
}
