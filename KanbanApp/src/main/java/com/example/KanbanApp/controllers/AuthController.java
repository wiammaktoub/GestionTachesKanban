package com.example.KanbanApp.controllers;

import com.example.KanbanApp.models.User.User;
import com.example.KanbanApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    UserService userService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @PostMapping("/register")
    public User regiseter(@RequestBody User user){
        user.setPassword(encoder.encode(user.getPassword()));
        return userService.register(user);
    }
}
