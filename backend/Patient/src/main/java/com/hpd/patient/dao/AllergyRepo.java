package com.hpd.patient.dao;

import com.hpd.patient.entities.Allergy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllergyRepo extends JpaRepository<Allergy, Long> {
}
