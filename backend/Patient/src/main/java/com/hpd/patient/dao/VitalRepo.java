package com.hpd.patient.dao;

import com.hpd.patient.entities.Vital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VitalRepo extends JpaRepository<Vital, Long> {
}
