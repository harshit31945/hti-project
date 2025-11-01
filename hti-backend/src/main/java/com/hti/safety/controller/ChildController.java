package com.hti.safety.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.hti.safety.service.ChildService;
import com.hti.safety.model.Child;
import java.util.List;

@RestController
@RequestMapping("/api/children")
public class ChildController {
    @Autowired
    private ChildService service;

    @GetMapping
    public List<Child> list(){ return service.listAll(); }

    @PostMapping
    public Child create(@RequestBody Child c){ return service.save(c); }
}
