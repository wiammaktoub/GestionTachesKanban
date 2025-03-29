package com.example.KanbanApp.models.User;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "personal_access_tokens")
public class PersonalAccessToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    protected TokenType type;

    @Column(name = "token", unique = true, nullable = false)
    protected String token;

    @Column(name = "last_used_at", nullable = true)
    protected LocalDateTime lastUsedAt;

    @Column(name = "expires_at", nullable = false)
    protected LocalDateTime expiresAt;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public PersonalAccessToken(){}

    public PersonalAccessToken(Long id, TokenType type) {
        this.id = id;
        this.type = type;
        this.token = "ABCDEF";
    }

    @ManyToOne
    @JoinColumn(name = "user_id")  // Reference by user ID instead of email
    private User user;

    public boolean isValid() {
        if (expiresAt == null) return false;
        if (lastUsedAt != null) return false;
        return expiresAt.isAfter(LocalDateTime.now());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TokenType getType() {
        return type;
    }

    public void setType(TokenType type) {
        this.type = type;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getLastUsedAt() {
        return lastUsedAt;
    }

    public void setLastUsedAt(LocalDateTime lastUsedAt) {
        this.lastUsedAt = lastUsedAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}