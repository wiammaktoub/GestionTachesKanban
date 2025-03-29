package com.example.KanbanApp.repositories;

import com.example.KanbanApp.models.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    public User findByUsername(String username);
    public User findByEmail(String email);
}
