package com.hpd.patient.dao;

import com.hpd.patient.entities.LabResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabResultRepo extends JpaRepository<LabResult, Long> {
}
