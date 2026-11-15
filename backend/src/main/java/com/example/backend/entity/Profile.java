package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "profiles", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {
    @Id
    private UUID id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String role; // "STUDENT" or "TEACHER"

    @Column(name = "created_at")
    private OffsetDateTime createdAt;
}
