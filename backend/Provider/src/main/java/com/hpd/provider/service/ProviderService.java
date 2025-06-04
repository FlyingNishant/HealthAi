package com.hpd.provider.service;

import com.hpd.provider.dto.ProviderDTO;
import com.hpd.provider.entities.CognitoUser;
import com.hpd.provider.entities.Provider;

import java.util.Optional;


public interface ProviderService {
    Optional<Provider> getProviderById(Long id);
    CognitoUser linkProviderToCognitoUser (CognitoUser cognitoUser);

    ProviderDTO getProviderBySubId(String subId);
}
