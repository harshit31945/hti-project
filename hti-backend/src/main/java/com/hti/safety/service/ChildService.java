package com.hti.safety.service;

import com.hti.safety.model.Child;
import com.hti.safety.repository.ChildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChildService {

    @Autowired
    private ChildRepository childRepository;

    // ✅ Get all children
    public List<Child> getAllChildren() {
        return childRepository.findAll();
    }

    // ✅ Add a child
    public Child addChild(Child child) {
        return childRepository.save(child);
    }

    // ✅ Delete child by ID
    public void deleteChild(Long id) {
        childRepository.deleteById(id);
    }

    // (Optional) Get child by ID
    public Child getChildById(Long id) {
        return childRepository.findById(id).orElse(null);
    }
}
