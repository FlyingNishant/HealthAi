package com.hpd.provider.service;

import com.hpd.provider.dao.CognitoUserRepo;
import com.hpd.provider.dao.ProviderRepo;
import com.hpd.provider.dto.ProviderDTO;
import com.hpd.provider.entities.CognitoUser;
import com.hpd.provider.entities.Provider;
import com.hpd.provider.exceptionHandler.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ProviderServiceImpl implements ProviderService {

    private ProviderRepo providerRepo;
    private CognitoUserRepo cognitoUserRepo;

    public ProviderServiceImpl(ProviderRepo providerRepo, CognitoUserRepo cognitoUserRepo) {
        this.providerRepo = providerRepo;
        this.cognitoUserRepo = cognitoUserRepo;
    }

    @Override
    public Optional<Provider> getProviderById(Long id) {
        return providerRepo.findById(id);
    }

    @Override
    public CognitoUser linkProviderToCognitoUser(CognitoUser cUser) {
        Provider mappedProvider;
        if (cUser != null) {
            mappedProvider = getRandomProvider();
            if (mappedProvider != null) {
                mappedProvider.setFirstName(cUser.getUsername());
                //map cUser to provider & save this cUser.
                cUser.setProvider(mappedProvider);
                return cognitoUserRepo.save(cUser); //updates the Provider as well.
            }
        }
        return null;
    }

    @Override
    public ProviderDTO getProviderBySubId(String subId) {
        ProviderDTO providerDTO;
        if (subId != null) {
            CognitoUser cUser = cognitoUserRepo.findBySubId(subId);
            if (cUser != null) {
                Provider provider = cUser.getProvider();
                if (provider != null) {
                    providerDTO = ProviderDTO.builder()
                            .username(cUser.getUsername())
                            .email(cUser.getEmail())
                            .subId(subId)
                            .personId(provider.getId())
                            .firstName(provider.getFirstName())
                            .lastName(provider.getLastName())
                            .gender(provider.getGender())
                            .build();

                    return providerDTO;
                } else throw new ResourceNotFoundException("No provider is linked with this cognito user.");
            } else throw new ResourceNotFoundException("No cognito user with the provided subject id exists.");
        }

        return null;
    }

    private Provider getRandomProvider() {
        List<Provider> freeProviderList = providerRepo.findByCognitoUserIsNull();
        if (freeProviderList.isEmpty()) {
            return null; // If no providers with null user_id exist
        }

        Random random = new Random();
        int randomIndex = random.nextInt(freeProviderList.size());
        return freeProviderList.get(randomIndex);
    }

}
