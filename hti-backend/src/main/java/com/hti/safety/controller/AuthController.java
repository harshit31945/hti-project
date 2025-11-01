package com.hti.safety.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.hti.safety.service.UserService;
import com.hti.safety.model.User;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public Object signup(@RequestBody User user){
        if(userService.findByEmail(user.getEmail())!=null){
            return java.util.Map.of("error", "User exists");
        }
        User u = userService.register(user);
        u.setPassword(null);
        return u;
    }

    @PostMapping("/login")
    public Object login(@RequestBody User req){
        User u = userService.findByEmail(req.getEmail());
        if(u!=null && u.getPassword().equals(req.getPassword())){
            u.setPassword(null);
            return u;
        }
        return java.util.Map.of("error", "Invalid credentials");
    }
}
