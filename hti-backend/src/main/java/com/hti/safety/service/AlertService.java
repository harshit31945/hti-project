package com.hti.safety.service;

import com.hti.safety.model.Alert;
import com.hti.safety.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {

    @Autowired
    private AlertRepository alertRepository;

    // ✅ Fetch all alerts
    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    // ✅ Create a new alert
    public Alert createAlert(Alert alert) {
        return alertRepository.save(alert);
    }

    // ✅ Delete alert by ID
    public void deleteAlert(Long id) {
        alertRepository.deleteById(id);
    }

    // (Optional) Get alert by ID if needed later
    public Alert getAlertById(Long id) {
        return alertRepository.findById(id).orElse(null);
    }
}
