package com.hpd.patient.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ios")
public class Io {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "io_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pat_id", nullable = false)
    @JsonIgnore
    private Patient patient;

    @Column(name = "io_type")
    private String type;

    @Column(name = "io_value")
    private String value;

    @Column(name = "units")
    private String unit;

}

