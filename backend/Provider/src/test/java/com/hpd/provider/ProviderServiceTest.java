package com.hpd.provider;

import com.hpd.provider.dao.CognitoUserRepo;
import com.hpd.provider.dao.ProviderRepo;
import com.hpd.provider.entities.Provider;
import com.hpd.provider.service.ProviderService;
import com.hpd.provider.service.ProviderServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
@ActiveProfiles("test")
public class ProviderServiceTest {

    @Mock
    private ProviderRepo providerRepo;

    @Mock
    private CognitoUserRepo cognitoUserRepo;

    private ProviderService providerService;
    private List<Provider> providerList;

    @BeforeEach
    void setUp() {
        // Initialize an in-memory patient list
        providerList = new ArrayList<>(Arrays.asList(
                new Provider(1L, "firstnm", "lastnm", "F", null),
                new Provider(2L, "firstnm2", "lastnm2", "M", null)
        ));
        providerService = new ProviderServiceImpl(providerRepo, cognitoUserRepo);
    }

    @Test
    void testGetPatientByIds() {
        Mockito.when(providerRepo.findById(any(Long.class))).thenReturn(Optional.ofNullable(providerList.get(0)));

        Optional<Provider> provider = providerService.getProviderById(1L);

        // Assert
        assertNotNull(provider);
        assertEquals(1L, provider.get().getId());
        assertEquals("firstnm", provider.get().getFirstName());
    }

}
