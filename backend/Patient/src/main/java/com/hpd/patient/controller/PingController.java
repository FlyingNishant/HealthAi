package com.hpd.patient.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/patients/ping")
public class PingController {

    @GetMapping
    public String ping() {
        return "lambda reachable";
    }
}
