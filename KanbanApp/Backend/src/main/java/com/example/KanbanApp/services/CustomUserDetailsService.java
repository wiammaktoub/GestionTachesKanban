package com.example.KanbanApp.services;

import com.example.KanbanApp.models.User.CustomUserDetails;
import com.example.KanbanApp.models.User.User;
import com.example.KanbanApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            user = userRepo.findByEmail(username);
            if (user == null){
                throw new UsernameNotFoundException("User not found");
            }
        }

        return new CustomUserDetails(user);
    }
}
