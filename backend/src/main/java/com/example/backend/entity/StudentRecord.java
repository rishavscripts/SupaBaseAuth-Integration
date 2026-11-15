package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "student_records", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id", unique = true)
    private UUID studentId;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "roll_number", nullable = false, unique = true)
    private String rollNumber;

    @Column(nullable = false)
    private String department;

    @Column(name = "math_marks", nullable = false)
    private Integer mathMarks;

    @Column(name = "science_marks", nullable = false)
    private Integer scienceMarks;

    @Column(name = "english_marks", nullable = false)
    private Integer englishMarks;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    @PrePersist
    @PreUpdate
    public void updateTimestamp() {
        this.updatedAt = OffsetDateTime.now();
    }
}
