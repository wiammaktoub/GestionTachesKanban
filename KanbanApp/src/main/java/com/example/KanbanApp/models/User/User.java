package com.example.KanbanApp.models.User;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(name = "username")
    protected String username;

    @Column(name = "firstname", nullable = false)
    protected String firstname;

    @Column(name = "lastname", nullable = false)
    protected String lastname;

    @Column(name = "email", unique = true, nullable = false)
    protected String email;

    @Column(name = "password", nullable = false)
    protected String password;

    @Column(name = "img")
    protected String img;

    @Column(name = "email_verified_at")
    protected LocalDateTime emailVerifiedAt = null;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public User(){}

    public User(String username, String firstname, String lastname, String email, String password, String img) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.img = img;
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PersonalAccessToken> tokens = new ArrayList<>();

    public boolean isEmailVerified() {
        return emailVerifiedAt != null;
    }

    public void verifyEmail() {
        this.emailVerifiedAt = LocalDateTime.now();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public LocalDateTime getEmailVerifiedAt() {
        return emailVerifiedAt;
    }

    public void setEmailVerifiedAt(LocalDateTime emailVerifiedAt) {
        this.emailVerifiedAt = emailVerifiedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<PersonalAccessToken> getTokens() {
        return tokens;
    }

    public void setTokens(List<PersonalAccessToken> tokens) {
        this.tokens = tokens;
    }
}