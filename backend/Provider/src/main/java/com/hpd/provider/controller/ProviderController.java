package com.hpd.provider.controller;

import com.hpd.provider.dto.ProviderDTO;
import com.hpd.provider.dto.ResponseDTO;
import com.hpd.provider.entities.CognitoUser;
import com.hpd.provider.entities.Provider;
import com.hpd.provider.service.ProviderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProviderController {

    private ProviderService providerService;

    public ProviderController(ProviderService providerService) {
        this.providerService = providerService;
    }

    @GetMapping("/healthCheck")
    public ResponseEntity healthCheck() {
        return ResponseEntity.ok().body(ResponseDTO.success("Provider Service is up and running!", null));
    }

    @GetMapping("/{id}")
    public ResponseEntity getProviderById(@PathVariable Long id) {
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

    @GetMapping("/sub/{subId}")
    public ResponseEntity<ResponseDTO> getProviderBySubId(@PathVariable String subId) {
        ProviderDTO providerDTO = providerService.getProviderBySubId(subId);
        if (providerDTO != null) {
            return ResponseEntity.ok()
                    .body(ResponseDTO.success("Provider fetched successfully.", providerDTO));
        } else return ResponseEntity.internalServerError()
                .body(ResponseDTO.failure("Error fetching provider details!", "INTERNAL_ERROR",
                        "Couldn't fetch provider details from DB."));
    }

    @PostMapping(value = "/signUp", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDTO> signUpUser(@RequestBody CognitoUser cognitoUser) {
        CognitoUser savedUser = providerService.linkProviderToCognitoUser(cognitoUser);

        if (savedUser != null) return ResponseEntity.ok()
                .body(ResponseDTO.success("User registration successful.", null));
        else return ResponseEntity.internalServerError()
                .body(ResponseDTO.failure("User registration failed!", "INTERNAL_SERVER_ERROR",
                        "Couldn't associate user to a provider." ));
    }

    @PutMapping(value = "/{id}/update", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity updateProvider(@PathVariable Long id, @RequestBody Provider provider) {
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

}
