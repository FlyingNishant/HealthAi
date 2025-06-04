package com.hpd.patient.dao;

import com.hpd.patient.entities.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepo extends JpaRepository<Problem, Long> {
}
