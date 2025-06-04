package com.hpd.prediction.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hpd.prediction.dao.PredictionRepo;
import com.hpd.prediction.dto.SageMakerInput;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.services.sagemakerruntime.SageMakerRuntimeClient;
import software.amazon.awssdk.services.sagemakerruntime.model.InvokeEndpointRequest;
import software.amazon.awssdk.services.sagemakerruntime.model.InvokeEndpointResponse;


@Service
public class PredictionServiceImpl implements PredictionService{

    private final SageMakerRuntimeClient sageMakerRuntimeClient;

    private final PredictionRepo predictionRepo;

    @Value("${sageMakerClient.url}")
    private String sagemakerEndpointName;

    public PredictionServiceImpl(SageMakerRuntimeClient sageMakerRuntimeClient, PredictionRepo predictionRepo) {
        this.sageMakerRuntimeClient = sageMakerRuntimeClient;
        this.predictionRepo = predictionRepo;
    }

    @Override
    public String predict(Long id) throws Exception{
        InvokeEndpointRequest requestBody = constructSageMakerInput(id);
        try {
            InvokeEndpointResponse response = sageMakerRuntimeClient.invokeEndpoint(requestBody);

            //TO DO: save the predictedDx in DB against the patientId, before returning
            return response.body().asUtf8String();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error invoking SageMaker endpoint: " + e.getMessage());
        }
    }

    @Override
    public InvokeEndpointRequest constructSageMakerInput(Long id) throws JsonProcessingException {
        //TO DO: fetch problems/clinical data associated with patient from patientId
        //TO DO: from the above data, create list of features i.e., SageMakerInput
        SageMakerInput input = new SageMakerInput(); //insert values

        String payload = new ObjectMapper().writeValueAsString(input);

        return InvokeEndpointRequest.builder()
                .endpointName(sagemakerEndpointName)
                .contentType("application/json")
                .body(SdkBytes.fromUtf8String(payload))
                .build();
    }
}
