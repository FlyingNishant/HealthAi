package com.hpd.patient.controller;

import com.hpd.patient.dto.ProviderDTO;
import com.hpd.patient.dto.ResponseDTO;
import com.hpd.patient.entities.Patient;
import com.hpd.patient.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class PatientController {

    @Autowired
    private PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/healthCheck")
    public ResponseEntity healthCheck() {
        return ResponseEntity.ok().body("Patient Service is up and running!");
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO> getPatientById(@PathVariable Long id) {
        Optional<Patient> patient = patientService.getPatientById(id);
        if (patient.isPresent()) {
            return ResponseEntity.ok()
                    .body(ResponseDTO.success("Patient details fetched successfully",
                            patient));
        } else return ResponseEntity.internalServerError()
                .body(ResponseDTO.failure("Error fetching patient details!", "INTERNAL_ERROR",
                        "Couldn't fetch patient's details from DB."));
    }

    @GetMapping("/user/{subId}/patient")
    public ResponseEntity<ResponseDTO> getPatientsByProviderId(
            @PathVariable String subId,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int rows_per_page
    ) {
        ProviderDTO providerDTO = patientService.getProviderByCognitoSubId(subId);
        if (providerDTO!=null) {
            Long providerId = providerDTO.getPersonId();
            Map<String, Object> response = patientService.getPatientsByProviderId(providerId, search, page, rows_per_page);
            return ResponseEntity.ok(ResponseDTO.success("Patients fetched successfully.", response));
        } else return ResponseEntity.internalServerError()
                .body(ResponseDTO.failure("Error fetching patient list!", "INTERNAL_ERROR",
                        "Couldn't fetch patient list from DB."));

    }

    @GetMapping("/{id}/diagnoses")
    public ResponseEntity getDiagnosesByPatientId(@PathVariable Long id) {
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}/similar-disease")
    public ResponseEntity getPatientsWithSimilarDisease(@PathVariable Long id) {
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

    @GetMapping("/hello/{id}")
    public void testing(@PathVariable long id) {
        System.out.println("Testing " + id);
    }


}
