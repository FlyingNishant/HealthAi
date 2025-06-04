package com.hpd.patient.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vitals")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vital {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "vtl_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pat_id", nullable = false)
    @JsonIgnore
    private Patient patient;

    @Column(name = "vital_type")
    private String type;

    @Column(name = "vital_value")
    private String value;

    @Column(name = "units_value")
    private String unit;

}
