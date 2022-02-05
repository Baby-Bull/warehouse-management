package com.sapo.storemanagement.exception;

public class UniqueKeyConstraintException extends RuntimeException {
    public UniqueKeyConstraintException(String message) {
        super(message);
    }
}
