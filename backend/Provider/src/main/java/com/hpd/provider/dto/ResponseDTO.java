package com.hpd.provider.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseDTO<T> {
    private final boolean success;
    private final String message;
    private final T data;
    private final ErrorDetails error;

    public static <T> ResponseDTO<T> success(String message, T data) {
        return new ResponseDTO<>(true, message, data, null);
    }

    public static ResponseDTO<Void> failure(String message, String errorCode, String errorDetails) {
        return new ResponseDTO<>(false, message, null, new ErrorDetails(errorCode, errorDetails));
    }
}

