package com.hpd.provider;

import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.serverless.proxy.spring.SpringBootLambdaContainerHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class LambdaHandler implements RequestStreamHandler {

    private static final SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;

    static {
        try {
            // Initialize Spring Boot handler for AWS Lambda
            handler = SpringBootLambdaContainerHandler.getAwsProxyHandler(ProviderApplication.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Could not initialize Spring Boot application", e);
        }
    }

    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
        // handler handles Lambda requests and routes them to the Spring Boot application.
        //proxyStream method is used to process the input/output stream of the Lambda request.
        handler.proxyStream(inputStream, outputStream, context);
    }
}