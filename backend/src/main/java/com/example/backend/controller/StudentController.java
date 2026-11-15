package com.example.backend.controller;

import com.example.backend.dto.StudentRecordRequest;
import com.example.backend.entity.StudentRecord;
import com.example.backend.repository.StudentRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {
    private final StudentRecordRepository recordRepository;

    @GetMapping("/record")
    public ResponseEntity<StudentRecord> getMyRecord(@AuthenticationPrincipal Jwt jwt) {
        UUID studentId = UUID.fromString(jwt.getSubject());
        return recordRepository.findByStudentId(studentId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Record not submitted yet"));
    }

    @PostMapping("/record")
    public ResponseEntity<StudentRecord> submitMyRecord(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody StudentRecordRequest req) {

        UUID studentId = UUID.fromString(jwt.getSubject());

        if (recordRepository.existsByStudentId(studentId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have already submitted your record.");
        }

        StudentRecord record = StudentRecord.builder()
                .studentId(studentId)
                .fullName(req.getFullName())
                .rollNumber(req.getRollNumber())
                .department(req.getDepartment())
                .mathMarks(req.getMathMarks())
                .scienceMarks(req.getScienceMarks())
                .englishMarks(req.getEnglishMarks())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(recordRepository.save(record));
    }
}
