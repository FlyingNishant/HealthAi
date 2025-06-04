package com.hpd.patient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PatientApplication {

    public static void main(String[] args) {
        System.setProperty("spring.profiles.active", "local"); // Force "local" profile
        SpringApplication.run(PatientApplication.class, args);
    }

}
