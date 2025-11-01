package com.hti.safety.service;

import org.springframework.stereotype.Service;
import com.hti.safety.repository.ChildRepository;
import com.hti.safety.model.Child;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
public class ChildService {
    @Autowired
    private ChildRepository repo;

    public List<Child> listAll(){ return repo.findAll(); }
    public Child save(Child c){ return repo.save(c); }
}
