package com.hti.safety.controller;

import com.hti.safety.model.User;
import com.hti.safety.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public Object signup(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return java.util.Map.of("error", "User exists");
        }
        User u = userService.register(user);
        u.setPassword(null);
        return u;
    }

    @PostMapping("/login")
    public Object login(@RequestBody User req) {
        User u = userService.findByEmail(req.getEmail());
        if (u != null && u.getPassword().equals(req.getPassword())) {
            u.setPassword(null);
            return u;
        }
        return java.util.Map.of("error", "Invalid credentials");
    }
}
