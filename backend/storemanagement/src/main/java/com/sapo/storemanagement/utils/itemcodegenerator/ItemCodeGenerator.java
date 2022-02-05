package com.sapo.storemanagement.utils.itemcodegenerator;

import org.springframework.stereotype.Component;

@Component
public abstract class ItemCodeGenerator {
    protected abstract String getPrefix();
    protected abstract long countRecords();

    public String generate() {
        StringBuilder s = new StringBuilder();
        String postfix = formatLongToString(countRecords() + 1);
        s.append(getPrefix());
        s.append(postfix);
        return s.toString();
    }

    private String formatLongToString(long number) {
        StringBuilder s = new StringBuilder(Long.toString(number));
        while(s.length() != 5) {
            s.insert(0, '0');
        }
        return s.toString();
    }
}
