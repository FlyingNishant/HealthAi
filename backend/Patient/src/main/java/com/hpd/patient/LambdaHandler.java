package com.hpd.patient;

import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.serverless.proxy.spring.SpringBootLambdaContainerHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;


import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class LambdaHandler implements RequestStreamHandler {

    //handler is statically initialized to bridge AWS Lambda and the Spring Boot app. The app can  handle API Gateway reqs
    private static final SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;

    static {
        try {
            // Initialize Spring Boot handler for AWS Lambda
            handler = SpringBootLambdaContainerHandler.getAwsProxyHandler(PatientApplication.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Could not initialize Spring Boot application", e);
        }
    }


    /**
     * This is the lambda function's entry point
     * @param inputStream
     * @param outputStream
     * @param context: This is Lambda context provided by AWS. It contains info about the env in which function is running.
     *                It contains imp details like function name, memory limit and request id for tracking.
     *               It also helps function understand details like who called it, how much time is left before function times out.
     * @throws IOException
     */
    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
        // handler handles Lambda requests and routes them to the Spring Boot application.
        //proxyStream method is used to process the input/output stream of the Lambda request.
        handler.proxyStream(inputStream, outputStream, context);
    }
}