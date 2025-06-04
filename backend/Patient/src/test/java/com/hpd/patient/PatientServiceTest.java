package com.hpd.patient;

import com.hpd.patient.dao.PatientRepo;
import com.hpd.patient.entities.Patient;
import com.hpd.patient.service.PatientService;
import com.hpd.patient.service.PatientServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
public class PatientServiceTest {
    private PatientService patientService;
    private List<Patient> patientList;

    @Mock
    private PatientRepo patientRepo;

//    @BeforeEach
//    void setUp() {
//        // Initialize an in-memory patient list
//        patientList = new ArrayList<>(Arrays.asList(
//                new Patient(1L, "John"),
//                new Patient(2L, "Smith")
//        ));
//
//        patientService = new PatientServiceImpl(patientRepo);
//    }
//
//    @Test
//    void testGetPatientByIds() {
//        Mockito.when(patientRepo.findById(any(Long.class))).thenReturn(Optional.ofNullable(patientList.get(0)));
//        Optional<Patient> patient = patientService.getPatientById(1L);
//        // Assert
//        assertNotNull(patient);
//        assertEquals(1L, patient.get().getId());
//        assertEquals("John", patient.get().getName());
//    }
//
//    @Test
//    void testGetAllPatients() {
//        Mockito.when(patientRepo.findAll()).thenReturn(patientList);
//        List<Patient> patients = patientService.getAllPatients();
//        // Assert
//        assertNotNull(patients);
//        assertEquals(2, patients.size());
//    }
}
