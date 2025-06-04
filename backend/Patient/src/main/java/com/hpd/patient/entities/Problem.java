package com.hpd.patient.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "diagnosis")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "prob_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pat_id", nullable = false)
    @JsonIgnore
    private Patient patient;

    @Column(name = "description")
    private String desc;
}
