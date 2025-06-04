package com.hpd.provider.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Entity
@Table(name = "E_PERSON")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "pers_id")
    private Long id;

    @Column(name = "gndr_cd")
    private String gender;

    @Column(name = "nm_first")
    private String firstName;

    @Column(name = "nm_last")
    private String lastName;

    @OneToOne(mappedBy = "provider")
    @ToString.Exclude //prevent  circular reference
    private CognitoUser cognitoUser;
}
