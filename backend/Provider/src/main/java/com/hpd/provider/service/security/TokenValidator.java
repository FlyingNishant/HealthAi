package com.hpd.provider.service.security;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.UrlJwkProvider;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.net.URL;
import java.security.interfaces.RSAPublicKey;

@Component
@Profile("!test") // Exclude this configuration when the 'test' profile is active
public class TokenValidator {

    private String cognitoIssuer;

    private String jwksUrl;

    public TokenValidator(@Value("${cognito.issuer}") String cognitoIssuer) {
        this.cognitoIssuer = cognitoIssuer;
        this.jwksUrl = cognitoIssuer + "/.well-known/jwks.json";
    }

    public DecodedJWT validateAndDecodeToken(String token) {
        try {
            // Fetch the JWKS JSON from AWS Cognito
            JwkProvider jwkProvider = new UrlJwkProvider(new URL(jwksUrl));

            // Decode the token to get Key ID (kid)
            DecodedJWT jwt = JWT.decode(token);
            Jwk jwk = jwkProvider.get(jwt.getKeyId()); //JSON Web Key Set

            // Use the public key to verify the token
            Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) jwk.getPublicKey(), null);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(cognitoIssuer)  // Validate issuer
                    .build();

            return verifier.verify(token);  // Returns decoded token if valid
        } catch (Exception e) {
           // System.err.println("Invalid JWT Token: " + e.getMessage());
            return null; // Return null if validation fails
        }
    }
}
