package com.hpd.provider.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProviderDTO {

    private String username;
    private String email;
    private String subId;
    private Long personId;
    private String firstName;
    private String lastName;
    private String gender;

}
