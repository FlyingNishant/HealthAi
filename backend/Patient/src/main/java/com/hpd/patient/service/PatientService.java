package com.hpd.patient.service;

import com.hpd.patient.dto.ProviderDTO;
import com.hpd.patient.entities.Patient;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface PatientService {
    List<Patient> getAllPatients();
    Optional<Patient> getPatientById(Long id);
    Map<String, Object> getPatientsByProviderId(Long providerId, String search, int page, int rowsPerPage);
    ProviderDTO getProviderByCognitoSubId(String subId);
    List<Patient> getPatientsWithSimilarDisease(Long id);
}
