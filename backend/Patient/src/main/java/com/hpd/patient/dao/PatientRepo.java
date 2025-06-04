package com.hpd.patient.dao;

import com.hpd.patient.entities.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface PatientRepo extends JpaRepository<Patient, Long> {
    Page<Patient> findByProviderId(Long providerId, Pageable pageable);

    @Query("SELECT p FROM Patient p WHERE p.providerId = :providerId " +
            "AND (LOWER(p.firstName) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(p.lastName) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Patient> findByProviderIdAndSearch(@Param("providerId") Long providerId,
                                            @Param("search") String search,
                                            Pageable pageable);
}
