package com.example.backend.repository;


import com.example.backend.entity.StudentRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface StudentRecordRepository extends JpaRepository<StudentRecord, Long> {
    Optional<StudentRecord> findByStudentId(UUID studentId);
    boolean existsByStudentId(UUID studentId);
}
