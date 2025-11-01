package com.hti.safety.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.hti.safety.service.AlertService;
import com.hti.safety.model.Alert;
import java.util.List;

@RestController
@RequestMapping("/api/alerts")

public class AlertController {
    @Autowired
    private AlertService service;

    @GetMapping
    public List<Alert> list(){ return service.listAll(); }

    @PostMapping
    public Alert create(@RequestBody Alert a){ return service.save(a); }
}
