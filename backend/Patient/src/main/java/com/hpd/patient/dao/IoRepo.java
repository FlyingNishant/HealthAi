package com.hpd.patient.dao;

import com.hpd.patient.entities.Io;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IoRepo extends JpaRepository<Io, Long> {
}
