package com.hpd.patient.service;

import com.hpd.patient.config.FeignClientConfig;
import com.hpd.patient.dto.ProviderDTO;
import com.hpd.patient.dto.ResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "provider-service", url = "http://localhost:8081/providers",
configuration = FeignClientConfig.class)
public interface ProviderClient {

    @GetMapping("/sub/{subId}")
    ResponseDTO<ProviderDTO> getProviderBySubId(@PathVariable("subId") String subId);

}
