package com.hpd.prediction.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import software.amazon.awssdk.services.sagemakerruntime.model.InvokeEndpointRequest;

public interface PredictionService {
    String predict(Long id) throws Exception;
    InvokeEndpointRequest constructSageMakerInput(Long id) throws JsonProcessingException;
}
