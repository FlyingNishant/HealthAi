package com.hpd.prediction.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SageMakerInput {
    private String modelVersion; // Optional metadata, e.g., model version
    private String requestId;    // Unique request identifier for tracking
    private float[][] features;  // 2D array of feature values for prediction
}