package com.hpd.provider;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProviderApplication {

    public static void main(String[] args) {

        System.setProperty("spring.profiles.active", "local"); // Force "local" profile
        SpringApplication.run(ProviderApplication.class, args);
    }

}
