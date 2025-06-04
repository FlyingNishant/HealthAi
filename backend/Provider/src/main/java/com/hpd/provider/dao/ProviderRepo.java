package com.hpd.provider.dao;

import com.hpd.provider.entities.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProviderRepo extends JpaRepository<Provider, Long>{
    List<Provider> findByCognitoUserIsNull ();
}
