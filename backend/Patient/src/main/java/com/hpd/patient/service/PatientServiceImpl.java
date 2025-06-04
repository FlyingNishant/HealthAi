package com.hpd.patient.service;

import com.hpd.patient.dao.PatientRepo;
import com.hpd.patient.dto.ProviderDTO;
import com.hpd.patient.dto.ResponseDTO;
import com.hpd.patient.entities.Patient;
import feign.FeignException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {
    private static final Logger logger = LoggerFactory.getLogger(PatientServiceImpl.class);
    private final PatientRepo patientRepo;

    private final ProviderClient providerClient;

    public PatientServiceImpl(PatientRepo patientRepo, ProviderClient providerClient) {
        this.patientRepo = patientRepo;
        this.providerClient = providerClient;
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }

    @Override
    public Optional<Patient> getPatientById(Long id) {
        return patientRepo.findById(id);
    }

    @Override
    public Map<String, Object> getPatientsByProviderId(Long providerId, String search, int page, int rowsPerPage) {
        Pageable pageable = PageRequest.of(page - 1, rowsPerPage);
        Page<Patient> patientPage;

        if (search != null && !search.trim().isEmpty()) {
            patientPage = patientRepo.findByProviderIdAndSearch(providerId, search, pageable);
        } else {
            patientPage = patientRepo.findByProviderId(providerId, pageable);
        }

        return Map.of(
                "total_records", patientPage.getTotalElements(),
                "record_per_page", patientPage.getSize(),
                "page", patientPage.getNumber() + 1,
                "patients", patientPage.getContent()
        );
    }

    @Override
    public ProviderDTO getProviderByCognitoSubId(String subId) {
        try {
            ResponseDTO<ProviderDTO> responseDTO = providerClient.getProviderBySubId(subId);
            if (responseDTO != null && responseDTO.getData() != null) {
                return responseDTO.getData();
            }
        } catch (FeignException e) {
            logger.error("Error fetching provider by subId: {}", subId, e);
        }
        return null;
    }

    @Override
    public List<Patient> getPatientsWithSimilarDisease(Long id) {
        return null;
    }
}
