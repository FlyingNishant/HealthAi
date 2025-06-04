package com.hpd.provider.service.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hpd.provider.dto.ResponseDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;


@Component
public class InvalidLoginHandlerService implements AuthenticationEntryPoint {

    private static final Logger LOGGER = LoggerFactory.getLogger(InvalidLoginHandlerService.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();

    //Spring security triggers this when token is missing or invalid.
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");

        ResponseDTO<Void> errorResponse = ResponseDTO.failure("Unauthorized",
                "UNAUTHORIZED", "Please pass a valid token!");

        String jsonResponse = objectMapper.writeValueAsString(errorResponse);
        response.getWriter().write(jsonResponse);
        response.getWriter().flush();
    }


}
