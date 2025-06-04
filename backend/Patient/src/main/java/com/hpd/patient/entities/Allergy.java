package com.hpd.patient.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "allergy")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Allergy {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "allergy_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pat_id", referencedColumnName = "pat_id", nullable = false)
    @JsonIgnore
    private Patient patient;

    @Column(name = "substance_value")
    private String type;

    @Column(name = "severity_value")
    private String value;



}
