package com.hpd.provider.dao;

import com.hpd.provider.entities.CognitoUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CognitoUserRepo extends JpaRepository<CognitoUser, Long> {
    CognitoUser findBySubId(String subId);
}
