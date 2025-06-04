package com.hpd.prediction.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/prediction/ping")
public class PingController {

    @GetMapping
    public String ping() {
        return "pong";
    }
}
