package com.hti.safety.service;

import org.springframework.stereotype.Service;
import com.hti.safety.repository.UserRepository;
import com.hti.safety.model.User;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User register(User u){
        return userRepository.save(u);
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }
}
