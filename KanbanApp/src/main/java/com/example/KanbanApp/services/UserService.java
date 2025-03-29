package com.example.KanbanApp.services;

import com.example.KanbanApp.models.User.User;
import com.example.KanbanApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    public User register(User user){
        return  userRepository.save(user);
    }
}
