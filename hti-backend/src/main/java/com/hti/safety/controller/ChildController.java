package com.hti.safety.controller;

import com.hti.safety.model.Child;
import com.hti.safety.service.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/children")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
public class ChildController {

    @Autowired
    private ChildService childService;

    @GetMapping
    public List<Child> getAllChildren() {
        return childService.getAllChildren();
    }

    @PostMapping
    public Child addChild(@RequestBody Child child) {
        return childService.addChild(child);
    }

    @GetMapping("/{id}")
    public Child getChild(@PathVariable Long id) {
        return childService.getChildById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteChild(@PathVariable Long id) {
        childService.deleteChild(id);
    }
}
