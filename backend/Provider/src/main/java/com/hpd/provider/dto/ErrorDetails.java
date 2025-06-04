package com.hpd.provider.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
class ErrorDetails {
    private final String code;
    private final String details;
}
