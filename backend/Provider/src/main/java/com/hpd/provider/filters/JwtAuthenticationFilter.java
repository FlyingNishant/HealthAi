package com.hpd.provider.filters;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.hpd.provider.service.security.TokenValidator;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@Profile("!test") // Exclude this configuration when the 'test' profile is active
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final TokenValidator tokenValidator; // AWS Cognito validator

    public JwtAuthenticationFilter(TokenValidator tokenValidator) {
        this.tokenValidator = tokenValidator;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String authHeader = req.getHeader("Authorization");

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String jwt = authHeader.substring(7); // Remove "Bearer " prefix

                // Validate and decode token using AWS Cognito public key
                DecodedJWT decodedJWT = tokenValidator.validateAndDecodeToken(jwt);
                if (decodedJWT != null) {
                    String username = decodedJWT.getClaim("username").asString();
                    String subject = decodedJWT.getSubject();
                    LOGGER.debug("Token is valid! User: " + username +  " with subject as: " + subject);

                    // Print all claims in the token
                    decodedJWT.getClaims().forEach((key, value) -> {
                        System.out.println("Claim: " + key + " = " + value.asString());
                    });
                    // Create an authentication token (no roles)
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
        } catch (Exception ex) {
            LOGGER.debug("Failed to validate the token and/or set authentication token in security context", ex);
        }
        filterChain.doFilter(req, res); // Continue the request processing
    }
}