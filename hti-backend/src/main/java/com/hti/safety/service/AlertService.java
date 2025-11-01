package com.hti.safety.service;

import org.springframework.stereotype.Service;
import com.hti.safety.repository.AlertRepository;
import com.hti.safety.model.Alert;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
public class AlertService {
    @Autowired
    private AlertRepository repo;

    public List<Alert> listAll(){ return repo.findAll(); }
    public Alert save(Alert a){ return repo.save(a); }
}
