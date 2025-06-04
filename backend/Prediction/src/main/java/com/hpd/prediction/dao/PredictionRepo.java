package com.hpd.prediction.dao;

import com.hpd.prediction.entities.PredictedDx;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PredictionRepo extends JpaRepository<PredictedDx, Long> {
}
