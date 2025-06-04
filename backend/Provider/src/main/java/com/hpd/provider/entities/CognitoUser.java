package com.hpd.provider.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "C_USER")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CognitoUser {
    @OneToOne(cascade = CascadeType.ALL) //Ensures persistence of Provider when CognitoUser is saved
    @JoinColumn(name = "pers_id", referencedColumnName = "pers_id", unique = true)
    private Provider provider;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "email_id", nullable = false)
    private String email;

    @Column(name = "subject_id", unique = true)
    private String subId;

    @Column(name = "username", nullable = false)
    private String username;

}