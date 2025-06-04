package com.hpd.patient.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lab_result")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LabResult {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "lab_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pat_id", nullable = false)
    @JsonIgnore
    private Patient patient;

    @Column(name = "comp_type")
    private String type;

    @Column(name = "lab_value")
    private String value;

    @Column(name = "nrm_rng")
    private String normalRange;

    @Column(name = "units")
    private String unit;

    @Column(name = "nrm_sts_value")
    private String status;

}